# Examples

We report practical examples showing how to build a simple code on the Cray and non-Cray production systems available at CSCS.

## Cray systems

Please find below an example of how to compile a simple MPI/CUDA program on Cray systems with GPUs.

```
/* Add two arrays on the device */
__global__ void gpu_kernel(int *d_a1, int *d_a2, int *d_a3, int N) {
    int idx = blockIdx.x*blockDim.x + threadIdx.x;
    if (idx < N)
    d_a3[idx] = d_a1[idx] + d_a2[idx];
}

extern "C"
void run_gpu_kernel(int *a1, int *a2, int *a3, int vecsize){
    /* a1, a2, a3: Host arrays */
    int *d_a1, *d_a2, *d_a3; /* Device arrays */

    /* Allocate the device arrays and copy data to the device */
    cudaMalloc((void**) &d_a1, sizeof(int)*vecsize);
    cudaMalloc((void**) &d_a2, sizeof(int)*vecsize);
    cudaMalloc((void**) &d_a3, sizeof(int)*vecsize);
    cudaMemcpy(d_a1, a1, sizeof(int)*vecsize, cudaMemcpyHostToDevice);
    cudaMemcpy(d_a2, a2, sizeof(int)*vecsize, cudaMemcpyHostToDevice);

    gpu_kernel<<<(vecsize-1)/4+1, 4>>>(d_a1, d_a2, d_a3, vecsize);

    cudaMemcpy(a3, d_a3, sizeof(int)*vecsize, cudaMemcpyDeviceToHost);

    cudaFree(d_a1);
    cudaFree(d_a2);
    cudaFree(d_a3);
}

extern "C"
void get_gpu_info(char *gpu_string, int dev){
 struct cudaDeviceProp dprop;
 cudaGetDeviceProperties(&dprop, dev);
 strcpy(gpu_string,dprop.name);
}

extern "C"
void set_gpu(int dev){
 cudaSetDevice(dev);
}
```

Compile the source code as follows:
```
module load daint-gpu
module load cudatoolkit
nvcc -c mpicuda.cu
cc -o mpicuda.x mpicuda_main.c mpicuda.o
```

## Non-Cray systems

Given below you have an example highlighting how to compile a simple MPI/OpenMP program on non-Cray systems.
```
#include <stdio.h>
#include <mpi.h>
#include <omp.h>

int main(int argc, char *argv[]) {
  int size, rank;
  int threadnum = 0, numthreads = 1;

  MPI_Init(&argc, &argv);
  MPI_Comm_size(MPI_COMM_WORLD, &size);
  MPI_Comm_rank(MPI_COMM_WORLD, &rank);

  #pragma omp parallel default(shared) private(threadnum, numthreads)
  {
    numthreads = omp_get_num_threads();
    threadnum  = omp_get_thread_num();
    printf("Hello from thread %d out of %d from process %d out of %d\n",
           threadnum, numthreads, rank, size);
  }

  MPI_Finalize();
}
```

The MPI library on non-Cray systems is MVAPICH2, loaded by your Programming Environment. First, load the desired programming environment, e.g. for the GNU compiler:
```
module load PrgEnv-gnu
mpicc hello_world_mpi.c -o hello_world_mpi.x
```
