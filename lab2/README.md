### Lab 2 ###

In this laboratory work we`ve got a text, ciphered with the SALSA 20. We can decipher it in two steps:
1. Firstly, we need to choose a line from the encrypted text and xor it with the others. In result, we should get something called "pseudo key" for every line 
2. Secondly, we should xor "pseudo key" with decrypted chosen line (from the previous step) and we`ll get decrypted line

The hardest work was to decrypt the chosen line, but if you pay attention to repeating fragments in the encrypted text and use pure guessing, you can gain the necessary decrypted part of the chosen line and understand that encrypted lines are encrypted **Shakespeare** text