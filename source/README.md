## Ironlauncher

This readme and all subsequent readme files are all going to be related to how to contribute to the ironlauncher, both on a template level, but also on a code level.

#### Major Libraries Used

- @swan-io/boxed
- kolorist
- minimist
- prompts
- the-templator
- vitest


### Libraries and their usages

#### **[@swan-io/boxed](https://swan-io.github.io/boxed/)**

This packages adds functional types and functions for typescript code. Creates functional wrappers for better handling specific "boxed" values. Heavily inspired by Rust patterns, the two patterns used are the `Option` and the `Result`.
- The `Option` can be seen as a wrapper to possible "nullable" values. Something can either be `some`thing or `none`thing. One place where we can imagine the `Option` is in flag handling. Some flags can either be set automatically, expect a default value, or be nothing. Depending on how we are handling each flag, we might want to specifically look at this pattern
- The `Result` pattern can be seein as a function `try / catch` or `.then/.catch`. Anything that is wrapped by the `Result` can either be `Ok` (successful), or an `Error` (a failure). Almost all operations that envolve the filesystem are wrapped in the `Result` pattern, in order to maintain a clear visual information that such operation can fail. We are not expecting it to, but how often do we get what we want??

#### **[kolorist](https://github.com/marvinhagemeister/kolorist#readme)**

This package is very similar to what has been used in the bootcamp (chalk), but its just a tiny smaller API layer. Some of the things that chalk offers are not necessary in this CLI.

#### **[minimist](https://github.com/minimistjs/minimist)**

This package is very straightfroward - it parses command line arguments and seperates simple inputs and flags.


#### **[prompts](https://github.com/terkelg/prompts#readme)**

This package is responsible for the clean questions that the ironlauncher asks to the users. The API is very straightforward and it has a wide range of possibilities for further questions that we might want to ask.

#### **[the-templator](https://github.com/adrienoak/the-templator)**

This package attempts to do one thing: take a target directory and copy its full contents to another target directory. Throughout its contents it should also be able to swap placeholders like this - `{{ name }}` into whatever property we pass into it as variables


#### **[vitest](https://vitest.dev/)**

It's the unit test framework. Over 100 tests are written to guarantee ironlauncher does what it is supposed to and vitest safeguards our intent



### Code Patterns and structure

The majority of the code that interfaces with external dependencies (like file system) are wrapped in a 'factory' function. This is done just for making sure they work as intended and for testability. In the end the functions that are actually returned are the ones that are used in the runtime.