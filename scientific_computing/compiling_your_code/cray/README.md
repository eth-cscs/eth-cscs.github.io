# Cray compiler

The Cray Compiling Environment (CCE) is a release of the Cray Fortran and Cray C compilers for use on x86-based Cray systems. The compiler provides partial support of the OpenMP 3.1 standard specification. PGAS languages (UPC and CAF) are integrated into the compiler (no preprocessor is necessary). The compiler fully supports the [OpenACC Application Programing Interface version 1.0](http://www.openacc.org/sites/default/files/OpenACC.1.0_0.pdf).

The Cray Fortran compiler conforms to the Fortran 2008 standard. 

The C/C++ compiler supports ANSI C99 and ANSI C++2003 (with some exceptions) and the UPC Language Specification 1.2. 

The compiler provides support for the Intel Sandy Bridge, Broadwell and Haswell architectures (AVX and AVX2 instruction sets).

The Cray Compiling Environment is accessed through the `PrgEnv-cray` module file. 

## Versions

The current default version of the compiler is loaded automatically when you load the programming environment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail cce`. To use a different version of the compiler issue `module switch cce cce/<new_version>`.

The man pages (`man crayftn`; `man craycc`) provide information on all the compiler options available. Note that if two compiler options conflict, the last option on the command line takes precedence!

## Recommended flags

The Cray compiler is a highly optimizing compiler, and the default optimization level is equivalent to `-O3` or `-fast` in other compiler suites. The default optimization level is the most thoroughly tested level and is recommended by Cray.

Moreover, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module as discussed in [Compiling Your Code](../../compiling_your_code) section (Specific note for the hybrid Piz Daint XC50/XC40) are turned on by default.

Inlining is enabled by default but can be tuned using the `-Oipan` (Fortran) or `-hipan`(C/C++) flags, where `n` is `0`, `1`, `2`, `3` (the default), or `4`. See the man pages (`man crayftn`; `man craycc`) for more information on inlining.

More aggressive optimization can be obtained with `-O3,fp3` or `-O3 -hfp3`, which are also well tested by Cray. The flag `-hfp3` adds a lot of floating point optimization, especially with 32-bit operands, and is recommended if the application runs cleanly at this level. If bit reproducibility is important (your application is intolerant to floating point re-association) then you might need to reduce to `-hfp1` (use `-hfp0` only if absolutely necessary). 

Note that the highest levels of optimization (such as `-Oipa5` or `-Oaggress`) should be used with caution as they will not always result in improved performance. 

## Compiler feedback

Cray provides compiler feedback called "Loopmark". If you compile the the `-rm` (Fortran) or `-hlist=m` (C/C++) flag then the compler will produce a listing file (`filenmae.lst`) which consists of an annotated lisiting of the source code with letters indicating optimizations performed ("I" for inlined, "r" for unrolled, "b" for blocked, and so on).  

The `-O negmsgs` option (or equivalently, the `-h negmesg` option) will tell the compiler to generate messages to standard error explaining why optimizations did not occur in a given instance. The `-eo` option will display all optimizations used by the compiler.

Please refer to the man pages (`man crayftn`; `man craycc`) for a full list of compiler options available. 

## OpenMP and threading

OpenMP support is turned on by default, so to disable the recognition of OpenMP directives you need to supply the `-h noomp` flag (or equivalently `-xomp` or `-Othread0`). The `-O threadn` option controls the optimization of OpenMP directives, where `n=0-3` with `0` meaning no optimization and `3` the most aggressive optimization.

Auto-threading is not turned on by default, however. You can enable it with `-hautothread`.   

## Debugging

The following compiler flags may be useful for helping debug your code. Note that the `-G` options can be specified on a per-file basis so that only part of an application pays the price for improved debugging

* `-g`, generate debugging information (equivalent to `-G0`)
* `-G0`, generate full debugging information with optimizations disabled (`-O0`, `-O ipa0`, `-O scale0`, `-O vector0`)
* `-G01`, generate debugging information with partial optimization
* `-G02`, generate debugging information with full optimization

## Further Information

The Cray compiler can produce many messages during the compiling and linking phases. To obtain further information about these messages, use the `explain` command: for example, `explain ftn-500` to get information on message 500. 

For information on the explain command, see `man explain`.

See the man pages for detailed information on the compilers and compiler flags (`man crayftn`; `man craycc`).

Refer to the Cray Fortran Reference Manual and Cray C and C++ Reference Manual from [CrayDoc](http://docs.cray.com/).
