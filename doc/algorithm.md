# Algorithm

*Refer to src/model.ts for definitions of the types (in bold)*

 - Prepare an empty list for **PlayerScore**s
 - For each **Person**
    - Generate all 21 possible **Hand**s
    - Prepare an empty list for **HandClassification** objects
    - For each of the **Hand**s
       - For each of the 10 **HandType**s
          - Check the **Hand** to see if it meets the **HandType**'s **requirement**
          - If it matches, add the resulting **HandClassification** to the list of **HandClassification** objects
    - Sort the **HandClassification** list based on the **compareTo** rule for the **HandClassification**
    - Add a new **PlayerScore** entry (with the **Person** and best scoring **HandClassification**) to the list of **PlayerScore**s
 - Sort the **PlayerScore**s by the **compareTo** rule for the **PlayerScore**'s
   **HandClassification**
 - Pretty print the resulting list
