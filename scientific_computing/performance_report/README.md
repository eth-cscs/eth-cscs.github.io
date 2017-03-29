# Performance Report

As high-performance computing resources become larger and more heterogeneous,
using them to their full potential for scientific research becomes increasingly
challenging. 
CSCS implements a review process of [Production Projects Submissions](http://www.cscs.ch/user_lab/allocation_schemes/submission100/index.html) with the evaluation of users application performance to improve the distribution of computing resources.

[Cray Performance and Analysis Tools (CrayPAT)](/scientific_computing/code_analysis/craypat) are the recommended performance tools on Cray systems, providing detailed information about application performance for basic profiling, MPI/OpenMP tracing, hardware performance counters, ...

## How to produce the performance report

Please proceed through the following steps:

1. first run a scaling test of your application before instrumenting the executable and report the scalability data and plot in the section __Representative Benchmarks and Scaling__ of your proposal, following the guidelines provided in the [performance report template](performance_report_template.pdf). You can use the [LaTeX template](performance_report_template.tex) to create the PDF file with the module `texlive` on the front-end Ela:
 ```bash
 pdflatex --shell-escape performance_report_template.tex (run it twice)
 ```
  Then select the most parallel efficient job size to run the performance analysis, on the basis of your scaling data;
 
1. instrument your application with CrayPAT to run the performance analysis, loading the appropriate perftool-cscs modulefile: 
 ```bash
 module load daint-gpu
 module load perftools-cscs/645-cuda
 ```
 You should load the module `perftools-cscs/645-nogpu` or `perftools-cscs/645-openacc` instead if your code does not make use of the GPU or if it uses OpenACC respectively. Then build your application as usual with the module loaded: the binary file created is instrumented and can be used in your batch script to run at the optimal job size and produce the performance report files, without the need to load the perftools modulefile again;

1. when the performance analysis job terminates successfully, you should find in your working folder two files with extension `.rpt` (report text file) and `.ap2` (apprentice binary file). Please make these two files available for inspection, either by enclosing them at submission time or indicating within the section __Performance Analysis__ of your proposal where they can be accessed under 
