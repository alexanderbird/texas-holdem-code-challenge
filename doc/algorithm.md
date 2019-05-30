# Algorithm

*Refer to ./model.md for definitions of the classes (in bold)*

 - Prepare an empty list for **GameRank**s
 - For each **Person**
    - Generate all 21 possible **Hand**s
    - Prepare an empty list for **HandSummary** objects
    - For each of the **Hand**s
       - For each of the 10 **HandType**s
          - Check the **Hand** to see if it meets the **HandType**'s **requirement**
          - If it matches, add the resulting **HandSummary** to the list of **HandSummary** objects
    - Sort the **HandSummary** list based on the **greaterThan** rule for the **HandSummary**
    - Add a new **GameRank** entry (with the **Person** and best scoring **HandSummary**) to the list of **GameRank**s
 - Sort the **GameRank**s by the **greaterThan** rule for the **GameRank**'s
   **HandSummary**
