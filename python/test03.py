lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
smt = 0

for pos, v in enumerate(lista):
    if v % 2 == 0:
        smt += v

print(smt)

# def sum_even_numbers(lst):
#     """
#     Calculates the sum of all even numbers in a list.
#     """
#     sum = 0
#     for num in lst:
#         if num % 2 == 0:
#             sum += num
#     return sum
#
# # Take input from user
# lst = input("Enter a list of integers (comma-separated): ")
#
# # Convert string input to list of integers
# lst = [int(num) for num in lst.split(',')]
#
# # Calculate sum of even numbers in list
# even_sum = sum_even_numbers(lst)
#
# # Output result
# print(f"The sum of even numbers in the list is: {even_sum}")
