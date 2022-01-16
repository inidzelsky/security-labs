### Hashes Cracking ###

I`ve found two hash files with 100k hashes per file:
* weakHashes.csv - MD5 hashes with no salt
* strongHashes.csv - SHA-1 hashes with salt

For cracking the hash-files, I used *hashcat* utility. *hashcat* is able to crack hashes using different attacks and algorithms (plain or with salt). First of all, I accomplished dictionary attack using 100k most common passwords dictionary

Dictionary attack results:
* MD5 - 28.278 / 100.000
* SHA-1 + Salt - 41.392 / 100.000

In spite of the fact that I`ve got more cracked strong hashes, weak cracking was accomplished immediately when strong one took 30 minutes. It happened because:
1. SHA-1 is slower and more complex than MD5
2. Strong hashes use salt and it slows the cracking process

The next stage of cracking will be combinating. We combine password from 2 sources (sources can be the same passwords list) and try to crack these passwords. 

After combinating stage I`ve got:
* MD - 28.279 + 14.595 / 100.000 = 42.874 / 100.000
* SHA-1 - 41.392 + 2 / 100.000 = 41.394 / 100.000

I've got very nice result for weak hashes - 14.595 passwords, but after 36 minutes I've found only 2 new passwords for the strong hashes. Also hashcat displays prediction on finish - "4 years, 142 days". The process of cracking got too complicated for the strong hashes

Next step of finding hashes would be toggle-case attack, but my hashcat version does not support this one

I`ve cracked particularly a half of the every hash-list with dictionary and combinator attacks. If we would like to found the exact password, the best ways is mask attack

## Common advices to protect yourself from hash attacks ##

1. Use only efficient hash-algorithms, which need enough resources to make cracking process more slower
2. Use pepper or secret to encrypt hashed value
3. Accept only protected passwords from users (restrict to use standard passwords ("qwerty", "password", etc), require different cases, special characters)
