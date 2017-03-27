# Programming Environments

All systems at CSCS use the [Modules](http://modules.sourceforge.net/) framework to simplify access to various compiler suites and libraries.
To access a particular compiler suite you should load (or switch to) the appropriate programming environment module, `PrgEnv-X` (where `X` is one of `gnu`, `intel`, `pgi` or `cray`). Each system at CSCS will have one or more of these programming environments available.

On the Cray systems, `PrgEnv-cray` is loaded by default.
To switch to another programming environment, e.g. Intel, issue the command: `module switch PrgEnv-cray PrgEnv-intel`.

On non Cray systems you will need to load a programming environment as there is no default.
For example, to load the GNU programming environment: `module load PrgEnv-gnu`.

For a given programming environment there may be several different versions of the base compiler available, one of which will be tagged as "(default)".
This default version will be loaded automatically when the `PrgEnv-x` module is loaded.

If you wish to use a different version of the base compiler you need to issue a `module switch` (or `swap`).
For example, to switch from the default gcc compiler of `PrgEnv-gnu` to `gcc/5.3.0`, issue the command: `module switch gcc gcc/5.3.0`.

# Enabling GPU support in the programming environment

The GPU programming environment is not readily available when you log in.
If you want to compile CUDA code, you should load the `cudatoolkit` module.
This will make available the `nvcc` compiler, the CUDA runtime environment and all the CUDA programming tools (profilers, debuggers etc.).

If you want to compile OpenACC code, you should make sure to load the `craype-accel-nvidia60` module.
Apart from loading `cudatoolkit`, this module will also set the target accelerator architecture to the Tesla P100 GPU (`CRAY_ACCEL_TARGET` environment variable) and allow you to compile OpenACC code with the Cray compiler.
If not loaded, Cray compiler will ignore the OpenACC directives, because a target accelerator could not be found.

For compiling OpenACC code with the PGI compiler, the `CRAY_ACCEL_TARGET` variable is not necessary, but the `cudatoolkit` module must be loaded.

# Useful module commands

Here is a list of useful commands of the [Modules](http://modules.sourceforge.net/) software management framework that will help you keep control of your current software environment:

* `module list`: Lists all the currently loaded modules in your environment.
* `module avail [modulename]...`: Lists all the available modules for the current system.
   You can optionally pass a list of module files to just examine if those exact modules are available.
   This command will perform a substring search and it will print all matched module names that start with the user supplied name.
   For example, typing `module avail cuda` will list all the module names starting with cuda.
* `module show <modulename>`: Shows all the dependencies and conflicts of modulename and all the environment variables that it sets.
   This command is useful when you need to know more internal details about the module you need.
* `module help <modulename>`: Prints a help message associated with the requested module.
