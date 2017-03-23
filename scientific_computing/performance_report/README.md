# Performance Report

As high-performance computing resources become larger and more heterogeneous, using them to their full potential for scientific research becomes increasingly challenging. CSCS intends to extend the production projects allocation process to include performance information about user applications in order to improve the allocation of compute resources, thus enabling more results of scientific merit. 

CrayPat is the recommended performance analysis tool for Cray systems: it provides detailed information about application performance, it can be used for basic profiling, MPI/OpenMP tracing and hardware performance counter based analysis. CrayPat also provides access to a variety of performance experiments that measure how an executable program consumes resources while it is running, as well as several different user interfaces that provide access to the experiment and reporting functions.

## How to produce a performance report:

First, you need to instrument your application, loading the appropriate perftool-cscs modulefiles:
```
module load daint-gpu
module load perftools-cscs/645-cuda
```

You should load the module perftools-cscs/645-nogpu or perftools-cscs/645-openacc if your code does not make use of the GPU or if it uses OpenACC respectively. Then please build your application as usual, to create the binary file instrumented for performance analysis: the executable can be used within a SLURM batch script without loading the module perftools-cscs.

When your job exits successfully, two files with extension `.rpt` (report file) and `.ap2` (apprentice file) will be written in your working folder. Please attach both files to your proposal and enclose within the text of your proposal a summary of the performance data of your most representative runs, extracting the following information from the performance report, as in the following example:
```
    Number of PEs (MPI ranks):     16
    Numbers of PEs per Node:        8  PEs on each of  2  Nodes
    Numbers of Threads per PE:      1
    Number of Cores per Socket:     8
    Execution start time:  Wed Sep 24 16:49:15 2014
    System name and speed:  daint05 2601 MHz

    Process Time:          1366  secs       85.368 secs per PE
    High Memory:        858.441 MBytes      53.653 MBytes per PE
    MFLOPS (aggregate):   15447 M/sec      965.459 M/sec per PE
    I/O Read Rate:       90.281 MBytes/sec        
    I/O Write Rate:      83.975 MBytes/sec

    |  25.0% | 2122.2 |     -- |    -- |MPI

    |  24.4% | 2074.2 |     -- |    -- |USER

    Read (MBytes): 18.724653 MBytes

    Write (MBytes): 38.421875 MBytes
```

The first ten lines come from the top of the report file; USER and MPI are listed in Table 1, Read and Write in Table 2. A performance report file can be found at the bottom of this page: please note that the report comes from a very small testcase, therefore it is shown only as a guideline to help you find the required information within the text.

## Additional information

We strongly encourage you to choose meaningful and representative job sizes, wallclock time and configurations: all proposals can only be evaluated by the data you provide, the better the data, the easier to pass the review process.

If you use a scientific application supported by CSCS, we will provide the instrumented executable in a modulefile: please contact us in case the modulefile has not been provided yet.

Advanced users can run a full performance analysis with CrayPAT if they wish, instrumenting their executable with the standard perftools module, as long as they provide in their proposals a performance report with the information required above, enclosing the required report files as well.

If your application does not run with CrayPat or help is needed in order to recompile it, please do not hesitate to contact us. For more details on proposal submission, please have a look at the webinars at the following link:
  * [Webinars on Proposal Submission](https://www.youtube.com/playlist?list=PL1tk5lGm7zvRnZJZQkVyC9wx-_1eiEJ5v)

Please note that the Cuda Multi Process Service is currently not supported by Cray perftools, therefore you cannot produce a meaningful report when `CRAY_CUDA_MPS=1` on Piz Daint. In this case please contact us and submit the scalability test of your application and a measure of the performance of your representative benchmark.

## Example: Performance report file by CrayPat-lite
```
    #################################################################
    #                                                                              
    #            CrayPat-lite Performance Statistics               
    #                                                              
    #################################################################

    CrayPat/X:  Version 6.2.1 Revision 13075 (xf 13045)  08/27/14 12:39:06
    Experiment:                  lite  lite/sample_profile
    Number of PEs (MPI ranks):     16
    Numbers of PEs per Node:        8  PEs on each of  2  Nodes
    Numbers of Threads per PE:      1
    Number of Cores per Socket:     8
    Execution start time:  Wed Sep 24 16:49:15 2014
    System name and speed:  daint05 2601 MHz

    Process Time:          1366  secs       85.368 secs per PE
    High Memory:        858.441 MBytes      53.653 MBytes per PE
    MFLOPS (aggregate):   15447 M/sec      965.459 M/sec per PE
    I/O Read Rate:       90.281 MBytes/sec        
    I/O Write Rate:      83.975 MBytes/sec        
    Ave CPU Energy:       25834 joules       12917 joules per node
    Ave CPU Power:       18.914 watts        9.457 watts per node
    Ave ACC Energy:        3396 joules        1698 joules per node
    Ave ACC Power:        2.486 watts        1.243 watts per node

    Table 1:  Profile by Function Group and Function (top 10 functions shown)

      Samp% |   Samp |   Imb. |  Imb. |Group
            |        |   Samp | Samp% | Function
            |        |        |       |  PE=HIDE
          
     100.0% | 8485.8 |     -- |    -- |Total
    |------------------------------------------------------------------------
    |  42.1% | 3575.9 |     -- |    -- |MATH
    ||-----------------------------------------------------------------------
    |  41.7% | 3536.4 | 1376.6 | 29.9% | pow
    ||=======================================================================
    |  25.0% | 2122.2 |     -- |    -- |MPI
    ||-----------------------------------------------------------------------
    ||  13.2% | 1124.1 | 1649.9 | 63.4% |MPI_Send
    ||  10.9% |  922.8 | 1790.2 | 70.4% |MPI_Wait
    ||=======================================================================
    |  24.4% | 2074.2 |     -- |    -- |USER
    ||-----------------------------------------------------------------------
    ||   6.5% |  555.0 |  209.0 | 29.2% |vdW_Coulomb_Energy
    ||   4.7% |  401.9 |   72.1 | 16.2% |LAMMPS_NS::PairReaxC::write_reax_lists
    ||   1.9% |  157.1 |   51.9 | 26.5% |rvec_ScaledAdd
    ||   1.7% |  141.4 |   39.6 | 23.4% |Init_Forces_noQEq
    ||   1.6% |  133.1 |   23.9 | 16.3% |BO
    ||   1.4% |  115.6 |   51.4 | 32.8% |Valence_Angles
    ||=======================================================================
    |   8.1% |  687.6 |     -- |    -- |ETC
    ||-----------------------------------------------------------------------
    |   6.5% |  551.1 |  138.9 | 21.5% | __amd_bas64_exp
    |========================================================================

    ===================  Observations and suggestions  ===================


    MPI utilization:

        The time spent processing MPI communications is relatively high and
        not evenly balanced over all PEs.  Functions and callsites
        responsible for consuming the most time can be found in the table
        generated by pat_report -O callers+src (within the MPI group).

    =========================  End Observations  =========================

    Table 2:  File Input Stats by Filename

         Read |      Read |  Read Rate |    Reads | Bytes/ |File Name[max15]
         Time |    MBytes | MBytes/sec |          |   Call | PE=HIDE
            
     0.207404 | 18.724653 |  90.281244 | 390645.0 |  50.26 |Total
    |-----------------------------------------------------------------------------------
    | 0.124897 | 15.065679 | 120.625100 | 352283.0 |  44.84 |VLDROP_defgrC_cSi_NVE.lmpdat
    | 0.056299 |  3.212683 |  57.064245 |  31692.0 | 106.30 |/proc/self/maps
    | 0.023432 |  0.444305 |  18.961236 |   6528.0 |  71.37 |ffield_SiC2.reaxc
    | 0.002614 |  0.001498 |   0.573074 |     78.0 |  20.14 |VLDROP_defgrC_cSi_NVE.lmpin
    | 0.000161 |  0.000488 |   3.036530 |     64.0 |   8.00 |_UnknownFile_
    |===================================================================================

    Table 3:  File Output Stats by Filename

        Write |     Write | Write Rate |    Writes |    Bytes/ |File Name[max15]
         Time |    MBytes | MBytes/sec |           |      Call | PE=HIDE
            
     0.457538 | 38.421875 |  83.975236 | 1625979.0 |     24.78 |Total
    |-----------------------------------------------------------------------------------------
    | 0.427572 | 19.970984 |  46.707892 | 1624948.0 |     12.89 |VLDROP_defgrC_cSi_bonds.lmpout
    | 0.025395 | 17.684272 | 696.372418 |      25.0 | 741732.12 |VLDROP_defgrC_cSi.lmpout
    | 0.001460 |  0.750014 | 513.820056 |     513.0 |   1533.04 |VLDROP_defgrC_cSi.0000000.ppm
    | 0.000954 |  0.004918 |   5.153713 |     168.0 |     30.70 |log.lammps
    | 0.000846 |  0.003478 |   4.109859 |      94.0 |     38.80 |stdout
    | 0.000760 |  0.000701 |   0.921765 |       3.0 |    245.00 |log.cite
    | 0.000333 |  0.001526 |   4.587860 |      32.0 |     50.00 |stderr
    | 0.000218 |  0.005981 |  27.426311 |     196.0 |     32.00 |_UnknownFile_
    |=========================================================================================

    Program invocation:  lmp_xc30+pat -in VLDROP_defgrC_cSi_NVE.lmpin

    For a complete report with expanded tables and notes, run:
      pat_report /scratch/daint/lucamar/lammps/2/lmp_xc30+pat+6899-1825s.ap2

    For help identifying callers of particular functions:
      pat_report -O callers+src /scratch/daint/lucamar/lammps/2/lmp_xc30+pat+6899-1825s.ap2
    To see the entire call tree:
      pat_report -O calltree+src /scratch/daint/lucamar/lammps/2/lmp_xc30+pat+6899-1825s.ap2

    For interactive, graphical performance analysis, run:
      app2 /scratch/daint/lucamar/lammps/2/lmp_xc30+pat+6899-1825s.ap2

    ================  End of CrayPat-lite output  ==========================
```
