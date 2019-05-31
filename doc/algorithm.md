# Algorithm

*Refer to src/model.ts for definitions of the types (in bold)*

 - Prepare an empty list for **PlayerScore**s
 - For each **Person**
    - Generate all 21 possible **Hand**s
    - Prepare an empty list for **HandScore** objects
    - For each of the **Hand**s
       - For each of the 10 **HandType**s
          - Check the **Hand** to see if it meets the **HandType**'s **requirement**
          - If it matches, add the resulting **HandScore** to the list of **HandScore** objects
    - Sort the **HandScore** list based on the **compareTo** rule for the **HandScore**
    - Add a new **PlayerScore** entry (with the **Person** and best scoring **HandScore**) to the list of **PlayerScore**s
 - Sort the **PlayerScore**s by the **compareTo** rule for the **PlayerScore**'s
   **HandScore**
 - Pretty print the resulting list
