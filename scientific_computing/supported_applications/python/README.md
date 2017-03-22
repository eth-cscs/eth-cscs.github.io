# List of supported Python modules

* Available on all Python installations (module called "Python", with capital P)

## Notes on the Python modules built with EasyBuild

* The current set up contains basic modules on the main Python easyconfig file
* Special modules come as separated easyconfig files
  * and once installed, they appear as a loadable module.

---

## Built-in modules

* Can be imported after loading the Python module
  * Setuptools
  * Pip
  * Nose
  * Numpy
  * Scipy
  * mpi4py
  * Cython
  * Six
  * Virtualenv
  * pandas

## Loadable modules

* Need an extra module load before the 'import'
  * h5py (serial/parallel)
  * matplotlib
  * pyCuda  (daint-gpu only)
  * netcdf4

---

# Python Virtual Environment

If you wish to install your own python modules, we recommend you to use [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

Start by loading Python, e.g., with Python 2.7

```bash
module load Python/2.7.12-CrayGNU-2016.11
```

## Setup your virtual environment

To create a virtual environment into which your modules will be installed,
you should use the provided `virtualenv` tool:

```bash
mkdir venv-2.7
virtualenv --system-site-packages venv-2.7
```

The following list of folders should be created inside the folder `venv-2.7`
```bash
bin include lib lib64
```

---

## Activate the Python Virtual Environment

In order to activate the python environment
```bash
source venv-2.7/bin/activate
```

which should replace the python with the one provided by the virtual environment
```bash
which python
$USER/venv-2.7/bin/python
```

One can use the following options to control the access to system installed packages

* The option `--system-site-packages` gives the virtual environment access to all modules already installed in the system (e.g numpy, pycuda, ...)
* If you would like to create a completely isolated virtual environment, you should use the ``--no-site-packages`` option instead.

## Deactivate the Python Virtual Environment

In the terminal just

```bash
deactivate
```

