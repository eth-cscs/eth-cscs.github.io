# Example Performance Report
```
#################################################################
#                                                               #
#            CrayPat-lite Performance Statistics                #
#                                                               #
#################################################################

CrayPat/X:  Version 6.4.5 Revision 87dd5b8  01/23/17 15:37:24
Experiment:                   lite  lite/gpu     
Number of PEs (MPI ranks):      16
Numbers of PEs per Node:         1  PE on each of  16  Nodes
Numbers of Threads per PE:   1,114
Number of Cores per Socket:     12
Execution start time:  Tue Mar 28 15:15:55 2017
System name and speed:  nid02294  2601 MHz (approx)
Intel haswell CPU  Family:  6  Model: 63  Stepping:  2


Avg Process Time:     2,100 secs             
High Memory:       13,977.3 MBytes     873.6 MBytes per PE
I/O Read Rate:    67.110363 MBytes/sec       
I/O Write Rate:   19.512511 MBytes/sec       

Notes for table 1:

  Table option:
    -O profile
  Options implied by table option:
    -d ti%@0.95,ti,imb_ti,imb_ti%,tr -b gr,fu,pe=HIDE,th=HIDE
  Other options:
    -s content='compact_header,tables,compact_details'
    -s fi_STYLE='fi[max10]'
    -s summoner='rtl'

  Options for related tables:
    -O profile_pe.th           -O profile_th_pe       
    -O profile+src             -O profile_max         
    -O load_balance            -O callers             
    -O callers+src             -O calltree            
    -O calltree+src        

  The Total value for Time, Calls is the sum of the Group values.
  The Group value for Time, Calls is the sum of the Function values.
  The Function value for Time, Calls is the avg of the PE values.
  The PE value for Time, Calls is the value for the main thread only.
    (If the main thread is atypical, try the option -s aggr_th=sum.)
    (To specify different aggregations, see: pat_help report options s1)

  This table shows only lines with Time% > 0.95.
    (To set thresholds to zero, specify:  -T)

  Imbalance percentages are relative to a set of threads or PEs.
  Other percentages at each level are of the Total for the program.
    (For percentages relative to next level up, specify:
      -s percent=r[elative])
  
  The following groups were pruned due to thresholding:
    IO, BLAS, BLACS, CUDA

Table 1:  Profile by Function Group and Function

  Time% |         Time |  Imb. Time |  Imb. |        Calls |Group
        |              |            | Time% |              | Function
        |              |            |       |              |  PE=HIDE
        |              |            |       |              |   Thread=HIDE
       
 100.0% | 2,086.808412 |         -- |    -- | 18,723,148.8 |Total
|-----------------------------------------------------------------------------
|  59.2% | 1,236.266484 | 110.728787 |  8.8% |          1.0 |USER
||----------------------------------------------------------------------------
||  59.2% | 1,236.266484 | 110.728787 |  8.8% |          1.0 |main
||============================================================================
|  31.8% |   664.415775 |         -- |    -- |     35,648.0 |MPI_SYNC
||----------------------------------------------------------------------------
||  28.5% |   594.643642 | 100.768091 | 16.9% |      5,470.0 |mpi_alltoallv_(sync)
||   1.6% |    34.103011 |  16.175622 | 47.4% |      5,825.0 |mpi_alltoall_(sync)
||   1.2% |    25.609945 |  11.328633 | 44.2% |     16,630.0 |mpi_allreduce_(sync)
||============================================================================
|   5.7% |   118.572464 |         -- |    -- |  4,071,691.5 |ETC
||----------------------------------------------------------------------------
||   2.6% |    54.467501 |   6.331161 | 11.1% |    472,362.3 |Cdgebr2d
||   1.1% |    23.956801 |   6.538536 | 22.9% |    344,898.2 |BI_Srecv
||============================================================================
|   2.8% |    58.511390 |         -- |    -- | 14,458,788.1 |MPI
||----------------------------------------------------------------------------
||   1.6% |    33.035489 |   3.623399 | 10.5% |    128,490.0 |mpi_waitall_
|=============================================================================

Notes for table 2:

  Options for this table:
    -d ht%@.95,ht,at,TA,FA,aT -b fu=[max10],pe=HIDE,th=HIDE
    -s content='compact_header,tables,compact_details'
    -s fi_STYLE='fi[max10]'
    -s summoner='rtl'

  The Total value for each data item is the sum of the Function values.
  The Function value for each data item is the avg of the PE values.
  The PE value for each data item is the value for the main thread only.
    (If the main thread is atypical, try the option -s aggr_th=sum.)
    (To specify different aggregations, see: pat_help report options s1)

  This table shows only lines with Host Time% > 0.95.
    (To set thresholds to zero, specify:  -T)
  This table shows only the maximum 10 Function entries, sorted by
    Host Time.

  Percentages at each level are of the Total for the program.
    (For percentages relative to next level up, specify:
      -s percent=r[elative])

Table 2:
  Accelerator Table by Function (top 10 functions shown) (maximum 10 shown)

   Host | Host | Acc Copy | Acc Copy | Events |Function=[max10]
  Time% | Time |       In |      Out |        | PE=HIDE
        |      | (MBytes) | (MBytes) |        |  Thread=HIDE
       
 100.0% | 1.89 |  105,946 |   287.62 | 75,246 |Total
|-----------------------------------------------------------------------
|  48.4% | 0.92 |  105,946 |       -- | 44,770 |acc_memcpy_h2d
|  20.7% | 0.39 |       -- |       -- |  9,299 |void cusmm_dnt_largeDB<>
|  11.5% | 0.22 |       -- |       -- |  3,592 |void cusmm_dnt_largeDB2<>
|   8.0% | 0.15 |       -- |       -- | 13,899 |void transpose_d<>
|   7.0% | 0.13 |       -- |       -- |  2,224 |void cusmm_dnt_medium<>
|   4.4% | 0.08 |       -- |   287.62 |  1,462 |acc_memcpy_d2h
|=======================================================================

Notes for table 3:

  Table option:
    -O read_stats
  Options implied by table option:
    -d rt,rb,rR,rd@,rC -b fi[max10],pe=HIDE
  Other options:
    -s content='compact_header,tables,compact_details'
    -s fi_STYLE='fi[max10]'
    -s summoner='rtl'

  The Total value for each data item is the sum of the File Name values.
  The File Name value for each data item is the sum of the PE values.
    (To specify different aggregations, see: pat_help report options s1)

  This table shows only lines with Reads > 0.
  This table shows only the maximum 10 File Name entries, sorted by
    Read Time.
  
  "/proc/self/maps" is a file used by various libraries for identifying
  mapped memory regions.
  
  "_UnknownFile_" is a label used for a file without an associated name
  (For example, unnamed pipes).

Table 3:  File Input Stats by Filename (maximum 10 shown)

 Read Time |  Read MBytes |  Read Rate |        Reads |   Bytes/ |File Name[max10]
           |              | MBytes/sec |              |     Call | PE=HIDE
          
 56.092035 | 3,764.356845 |  67.110363 | 62,097,047.0 |    63.57 |Total
|-----------------------------------------------------------------------------
| 55.421218 | 3,757.323803 |  67.795764 | 61,713,064.0 |    63.84 |/proc/self/maps
|  0.427406 |     5.904896 |  13.815644 |    309,600.0 |    20.00 |/proc/self/statm
|  0.085349 |     0.125000 |   1.464573 |         16.0 | 8,192.00 |./GTH_BASIS_SETS
|  0.076371 |     0.487160 |   6.378830 |     63,853.0 |     8.00 |_UnknownFile_
|  0.045640 |     0.078125 |   1.711772 |         10.0 | 8,192.00 |./POTENTIAL
|  0.027359 |     0.037681 |   1.377255 |          7.0 | 5,644.43 |H2O-256.inp
|  0.004814 |     0.378559 |  78.640783 |     10,001.0 |    39.69 |/proc/cpuinfo
|  0.003032 |     0.017853 |   5.887995 |         32.0 |   585.00 |/proc/meminfo
|  0.000553 |     0.003632 |   6.562849 |        320.0 |    11.90 |/proc/devices
|  0.000292 |     0.000137 |   0.470394 |        144.0 |     1.00 |_pipe_read_
|=============================================================================

Notes for table 4:

  Table option:
    -O write_stats
  Options implied by table option:
    -d wt,wb,wR,wr@,wC -b fi[max10],pe=HIDE
  Other options:
    -s content='compact_header,tables,compact_details'
    -s fi_STYLE='fi[max10]'
    -s summoner='rtl'

  The Total value for each data item is the sum of the File Name values.
  The File Name value for each data item is the sum of the PE values.
    (To specify different aggregations, see: pat_help report options s1)

  This table shows only lines with Writes > 0.
  This table shows only the maximum 10 File Name entries, sorted by
    Write Time.
  
  "_UnknownFile_" is a label used for a file without an associated name
  (For example, unnamed pipes).

Table 4:  File Output Stats by Filename (maximum 10 shown)

    Write |    Write | Write Rate |   Writes |   Bytes/ |File Name[max10]
     Time |   MBytes | MBytes/sec |          |     Call | PE=HIDE
         
 0.151159 | 2.949494 |  19.512511 | 74,334.0 |    41.61 |Total
|-------------------------------------------------------------------------
| 0.111222 | 2.211487 |  19.883612 | 72,466.0 |    32.00 |_UnknownFile_
| 0.023784 | 0.524416 |  22.049361 |    144.0 | 3,818.68 |H2O-256-pos-1.xyz
| 0.011578 | 0.001499 |   0.129484 |     12.0 |   131.00 |H2O-256-1.ener
| 0.002561 | 0.086657 |  33.831589 |  1,536.0 |    59.16 |stdout
| 0.001369 | 0.125299 |  91.501972 |     32.0 | 4,105.78 |H2O-256-1.restart
| 0.000645 | 0.000137 |   0.212904 |    144.0 |     1.00 |_pipe_write_
|=========================================================================

Program invocation:
  /apps/daint/UES/sandbox/lucamar/easybuild/software/CP2K/4.1-CrayGNU-2016.11-cuda-8.0.54-pat-645-cuda/bin/cp2k.psmp H2O-256.inp

For a complete report with expanded tables and notes, run:
  pat_report /scratch/snx3000/lucamar/cp2k/cp2k.psmp+16437-2294t.ap2

For help identifying callers of particular functions:
  pat_report -O callers+src /scratch/snx3000/lucamar/cp2k/cp2k.psmp+16437-2294t.ap2
To see the entire call tree:
  pat_report -O calltree+src /scratch/snx3000/lucamar/cp2k/cp2k.psmp+16437-2294t.ap2

For interactive, graphical performance analysis, run:
  app2 /scratch/snx3000/lucamar/cp2k/cp2k.psmp+16437-2294t.ap2

================  End of CrayPat-lite output  ==========================
```
