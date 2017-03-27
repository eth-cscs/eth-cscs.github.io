# EasyBuild framework

The [EasyBuild framework](https://easybuild.readthedocs.io/en/latest) is available at CSCS through the module `EasyBuild-custom`. This module defines the location of the EasyBuild configuration files, recipes and installation directories. On Piz Daint, which is a heterogeneous system, you need to select which architecture should be targeted when building software. You can target the Intel Haswell architecture accessing the gpu software stack using the command:

```bash
module load daint-gpu EasyBuild-custom
```

Alternatively, you can target the Intel Broadwell architecture and the mc (multicore) software stack:

```bash
module load daint-mc EasyBuild-custom
```

On Piz Daint, EasyBuild software and modules will be installed by default under the following folder:

```bash
$HOME/easybuild/<system-name>/<architecture>
```

Here `<architecture>` will be either `haswell` or `broadwell`. On the other systems the default installation folder is instead the following:

```bash
$HOME/easybuild/<system-name>
```

The variable `<system-name>` is the login name of the system, e.g. `daint`, `leone`, `monch`... You can override the default installation folder and the default repository path by exporting the environment variables listed below, before loading the EasyBuild modulefile:

```bash
export EASYBUILD_PREFIX=/your/preferred/installation/folder
export EB_CUSTOM_REPOSITORY=/your/cscs/repository/folder
module load EasyBuild-custom
```

In order to get the right folder structure expected by EasyBuild before setting up your custom paths, you might clone the CSCS project production maintained on GitHub:

```bash
git clone https://github.com/eth-cscs/production.git
```

The command will download the project files under a newly created folder production. If you wish to use it as your custom repository, you need to export the corresponding EasyBuild environment variable:

```bash
export EB_CUSTOM_REPOSITORY=/<your_local_path>/production/easybuild
```

You will find the CSCS EasyBuild configuration files under `/<your_local_path>/production/easybuild/easyconfigs`, with application folders listed in alphabetical order.

# How to Build your Program

After you load the EasyBuild environment as explained in the section above, you will have the command eb available to build your code using EasyBuild. If you want to build the code using a given configuration `<filename>.eb` and resolving dependencies, you will use the flag `-r` as in the example below:

```bash
eb <filename>.eb -r
```

The build command just needs the configuration file name with the extension `.eb` and not the full path, provided that the configuration file is in your search path: the command `eb --show-config` will print the variable `robot-paths` that holds the search path. More options are available, please have a look at the short help message typing `eb -h`. For instance, you can check if any EasyBuild configuration file already exists for a given program name, using the search flag `-S`:

```bash
eb -S <program_name>
```

Please note that on Cray systems you can use the configuration files that rely of a Cray toolchain, which you will find in the configuration filename (`eb -S <name> | grep Cray`). You will be able to load the modules created by EasyBuild in the folder defined by the `EASYBUILD_PREFIX` variable using the following commands:

```bash
module use $EASYBUILD_PREFIX/modules/all
module load <modulename>/version
```

The command module use will prepend the selected folder to your `MODULEPATH` environment variable, therefore you will see the new modules with module avail.
Please note that by default `EASYBUILD_PREFIX` is set to a folder inside your `$HOME`, however the `$HOME` folder is by default not readable by other users.
Therefore if you want to make your builds available to your group, then you need to allow read-only access to other members of your group using the command `chmod g+rx $HOME`.

