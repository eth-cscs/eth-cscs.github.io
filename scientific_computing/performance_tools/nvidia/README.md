# NVIDIA tools

In addition to Cray's [Craypat](../craypat/) and VI-HPS' [Score-p](../vihps/), the following tools from NVIDIA are supported:

* [nvprof](http://docs.nvidia.com/cuda/profiler-users-guide/#nvprof-overview): command line profiler
* [nvvp](http://docs.nvidia.com/cuda/profiler-users-guide/#visual): visual profiler

## Profiling

First collect performance data on the compute node using nvprof:

> module load craype-accel-nvidia60   
> unset COMPUTE_PROFILE  
> export PMI_NO_FORK=1  
> srun -C gpu -n1 nvprof -o nvprof.output.%h.%p myexe  

%h (and %p) will report the node name (and process ID) in the output file name
( `nvprof -h` for more details ). Then view and analyze the data using nvvp:

> nvvp &  
>      File -> Import -> Nvprof file 

or  

> nvprof -i nvprof.output.file 
 
## Debugging

For cpu and gpu debugging, you may want to use [DDT](../../debugging_tools/).
For reference, Nvidia debugging tools are also available:

* [cuda-gdb](http://docs.nvidia.com/cuda/cuda-gdb): debugger
* [cuda-memcheck](http://docs.nvidia.com/cuda/cuda-memcheck): memory checker

## Troubleshooting

For further information please check: 

* [NVIDIA documentation](http://docs.nvidia.com/cuda)
* [CSCS Youtube channel](https://www.youtube.com/playlist?list=PL1tk5lGm7zvRTCytmM-2dtz7ArhwSdx-B)

In case of questions/remarks, please contact us at [help@cscs.ch](mailto:help@cscs.ch)
