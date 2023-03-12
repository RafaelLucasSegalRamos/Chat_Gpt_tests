import pygame
import random

# initialize pygame
pygame.init()

# set up the game window
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Coin Collector")

# define colors
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)

# set up the player and coins
player_size = 50
player_pos = [screen_width / 2, screen_height / 2]
coin_size = 30
coin_pos = [random.randint(0, screen_width - coin_size), random.randint(0, screen_height - coin_size)]
coin_list = [coin_pos]

# set up the obstacles
obstacle_size = 50
obstacle_pos = [random.randint(0, screen_width - obstacle_size), random.randint(0, screen_height - obstacle_size)]
obstacle_list = [obstacle_pos]

# set up the game loop
game_over = False
clock = pygame.time.Clock()
score = 0


def detect_collision(obj1_pos, obj1_size, obj2_pos, obj2_size):
    if (obj1_pos[0] + obj1_size > obj2_pos[0]) and (obj1_pos[0] < obj2_pos[0] + obj2_size):
        if (obj1_pos[1] + obj1_size > obj2_pos[1]) and (obj1_pos[1] < obj2_pos[1] + obj2_size):
            return True
    return False


# define functions
def draw_player():
    pygame.draw.rect(screen, blue, (player_pos[0], player_pos[1], player_size, player_size))


yellow = (255, 255, 0)


def draw_coins():
    for coin_pos in coin_list:
        pygame.draw.circle(screen, yellow, (coin_pos[0] + coin_size / 2, coin_pos[1] + coin_size / 2), coin_size / 2)


def draw_obstacles():
    for obstacle_pos in obstacle_list:
        pygame.draw.rect(screen, red, (obstacle_pos[0], obstacle_pos[1], obstacle_size, obstacle_size))


def move_coins(score):
    for index, coin_pos in enumerate(coin_list):
        if coin_pos[1] >= screen_height - coin_size:
            coin_list.pop(index)
            score += 1
        else:
            coin_pos[1] += 10
    return score


def create_obstacles():
    new_obstacle_pos = [random.randint(0, screen_width - obstacle_size),
                        random.randint(0, screen_height - obstacle_size)]
    obstacle_list.append(new_obstacle_pos)


def draw_score():
    font = pygame.font.Font(None, 36)
    text = font.render("Score: " + str(score), True, white)
    screen.blit(text, [0, 0])


# game loop
while not game_over:

    # handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                player_pos[0] -= player_size / 2
            elif event.key == pygame.K_RIGHT:
                player_pos[0] += player_size / 2
            elif event.key == pygame.K_UP:
                player_pos[1] -= player_size / 2
            elif event.key == pygame.K_DOWN:
                player_pos[1] += player_size / 2

    # draw objects
    screen.fill(black)
    draw_player()
    draw_coins()
    draw_obstacles()
    draw_score()

    # update game objects
    score = move_coins(score)
    if len(coin_list) < 5:
        coin_pos = [random.randint(0, screen_width - coin_size), random.randint(0, screen_height - coin_size)]
        coin_list.append(coin_pos)

    if len(obstacle_list) < 2:
        create_obstacles()

    # check for collisions
    for coin_pos in coin_list:
        if detect_collision(player_pos, player_size, coin_pos, coin_size):
            score += 1
            coin_list.remove(coin_pos)

    for obstacle_pos in obstacle_list:
        if detect_collision(player_pos, player_size, obstacle_pos, obstacle_size):
            game_over = True

    # update the screen
    pygame.display.update()

    # set the frame rate
    clock.tick(30)
