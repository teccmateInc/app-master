### STYLE GUIDE
This guide will be expanded as needed.

Please make EXTRA sure that your commits do not include unnecessary formatting changes, unless the file formatting did not previously match our standards.

***NOTE: All of us should be able to reformat ALL of the files before every commit, and only our changes should be left. In other words, by using `/.editorconfig` settings in our IDEs (WebStorm, VS Code, etc.), our files should always end up formatted identically. The only changes should be our changes for the work we are doing.***

1. Single quotes for all code quotes
    - console.log('Something interesting')
1. Double quotes for all user-visible quotes
    - Users will "see" this message.
1. Parentheses even around single parameters
    - const functionName = async (singleParameter) => {
    - const functionName = async (parameterOne, parameterTwo) => {
1. No semi-colons at the end of lines
    - console.log('JavaScript doesn't require semi-colons at the end of lines.')
1. Keep lines short so blocks are more visible together
