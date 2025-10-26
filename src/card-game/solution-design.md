Basically this is a game about planning ahead and making the best long term decisions at each decision point

## Scenarios

###Even that splits to an odd

- Ex. 6 / 2 = 3

###Even that splits to an even

- Ex 4 / 2 = 2

###Odd

- Ex 5 - 1 = 4

Is Even Splitting to Odd a forcing move where all splits into odds will make the other player only take 1?
P1: 14 / 2 = 7
P2: 7 - 1 = 6
P1: 6 / 2 = 3 => even until the end for P1

Ex 2.
P1: 38 / 2 = 19
P2: 19 - 1 = 18
P1: 18 / 2 = 9
P2: 9 - 1 = 8
P1: 8 / 2 = 4 => now an even

It is not about winning but collecting maximum cards. If it were about winning then just taking the first half you get

This seems like I could get to a theoretical solution knowing some math trick here. Without that it feels like I should solve it by breaking it down into the simplest versions.

Let's start with writing some tests. I will create some and see what makes sense for the first 5 numbers?

Working through more examples:
Start 4:
A)
P1: 4-1 = 3
P2: 3-1 = 2
P1: ...1 --> total: 2
B)
P1: 4/2 = 2
P2: 2-1 = 1
P1: ...1 --> 3

Start=5:
P1: 5-1 = 4
P2: 4/2 = 2
P1: ...1 --> 2

Okay let's pause and consider evens that split to evens
P1: 200 / 2 = 100
P2: 100 / 2 = 50
P1: 50 / 2 = 25
P2: 25 - 1 = 24
P1: 24 / 2 = 12
P2: 12 / 2 = 6
P1: 6 / 2 = 3

Note: binaries on right were added after releasing the main trick of this problem
Hmm that works out for P1 but wb if P1 starts at 400
P1: 400 / 2 = 200 : 400->1 1001 0000
P2: 200 / 2 = 100
P1: 100 / 2 = 50 : 32 + 16 + 0 + 0 + 2 + 0 = 110010
P2: 50 / 2 = 25 : 11001
P1: 25 - 1 = 24 : 11000
P2: 24 / 2 = 12
P1: 12 / 2 = 6
P2: 6 / 2 = 3
P1: 3 - 1 = 2
P2: 2 - 1 = 1
P1: 1 - 1 = 0
Total for P1: 200 + 50 + 1 + 6 + 1 + 1 = 259

Okay yeah so what if P1 subtracts by 1 there
P1: 400 - 1 = 399 : 1100 0111
P2: 399 - 1 = 398 : 1100 0110
P1: 398 / 2 = 199
P2: 199 - 1 = 198
P1: 198 / 2 = 99
P2: 99 - 1 = 98
P1: 98 / 2 = 49
P2: ... 48
P1: / 2 = 24
P2: 24 / 2 = 12
P1: 12 / 2 = 6
P2: 6 / 2 = 3
P1: -1 = 2
P2: -1 = 1
P1: -1 = 0
Total for P1: 1 + 199 + 99 + 49 + 24 + 6 + 1 + 1 = 200 + 100 + 50 + 30 = 380

So the pattern I am seeing is more like how many divides by 2 are you away from an odd number

How can I figure out how many halves away from a take 1 situation appears.

Is there any pattern for this? I feel like I should look at a simpler example. Why is 3 different than 4? Simply even or odd. Can I model this in binary then?

1 = 001
2 = 010
3 = 011
4 = 100
5 = 101
6 = 110
7 = 111

Hmmmm, so maybe there is usefulness in that each division is just removing one 0 from the right

So 6=110 is one away from an odd number. But 12 = 1100 is 2 away from an odd number, therefore setting itself up for an odd number if you divide by 2.
So if you subtract 1 from 12 you get 11=1011 which makes your next move 10=1010, leading you to force the other player into an odd number situation.

What about 01 1000 = 24? If you divide you give P2 a chance of also taking half the pile. While if you subtract by 1 -> 01 0111 = 23 then you force a subtraction to 01 0110 where you maintain control of taking all evens. Let's walk through the rest of the sequence there
P1: 01 0110->22 / 2
P2: 11->1011 - 1
P1: 1010->10 / 2
P2: 101->5 - 1
P1: 4...
Therefore, seems the general case for the best decision a player can make when they have an even number is

- if n % 4 == 0, subtract one to force the sequence of next player subtracting 1 to get you back to an even with the choices
- if n % 4 == 2, divide by half

So another good test case would likely be some binary number that goes has some 2+ sequence of 0s in the middle of the process: so 1100 0100->100
P1: 1100 0100->100 - 1
P2: 1100 0011->99 - 1
P1: 1100 0010->98 / 2
P2: 0110 0001->49 - 1
P1: 0110 0000->48 - 1
P2: 0101 1111->47 - 1
P1: 0101 1110->46 / 2
P2: 0010 1111->23 - 1
P1: 0010 1110->22 / 2
P2: 0001 0111->11 - 1
...
This example also shows the power of maximizing P1s cards by minimizing the amount of cards that P2 can take
