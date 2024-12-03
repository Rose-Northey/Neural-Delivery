# Full-Stack Assignment #1

## Materials to Read

- [Learn React](https://react.dev/learn)
- [Learn ASP.NET Core](https://dotnet.microsoft.com/en-us/learn)
- [Learn MS SQL Server](https://learn.microsoft.com/en-us/sql/sql-server)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Concepts to Research

- Class Components in React
- Functional Components in React
- Hooks in React
- DOM (“Real”, Virtual, Shadow)

## Task

After years of delivering mail to the same homes, Bob expected he would start remembering those he delivers to. Unfortunately, Bob has a poor memory and always forgets a face, probably from all the long late nights at Carrier University. This is problematic because when Bob is invited to neighborhood gatherings, let's just say things can get a little awkward at times.

Studies in carrier science have discovered that forgetful memory is a common problem for carriers and have created a foolproof plan to improve carrier memory efficiency. The plan involves crafting a memory game that carriers can use as brain training!

### Memory Game Requirements

Start by creating a quick wireframe of the game and then create a functional prototype for the Carrier Science Committee to test. The committee has some strict requirements to keep in mind:

- **Three difficulty settings for the grid size:**
  - Easy: 4 x 3
  - Medium: 4 x 4
  - Hard: 4 x 5
- There should only ever be two of the same card
- Cards must be shuffled every game
- The pictures on the cards should be relevant to carriers' interests. Get creative with the pictures, but you must include what the database shows as the top three things all carriers like:
  - Ducks
  - Ukuleles
  - Black Cats
- Cards should animate when being revealed or turned back over
- Must show a count of how many moves have been made
- A screen for when you win

### Final Product Requirements

The Carrier Science Committee loves the prototype but has additional requirements for the final product, for science:

- All games must record the moves made and the time between each move
- The move data must get sent to the server so it can be stored in the database
- They need a page to view this data
- Add a button to "replay" the moves so the scientists can watch and analyze any game
