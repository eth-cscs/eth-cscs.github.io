# VI-HPS tools

This page introduces the performance tools developed by the [VI-HPS Institute](http://www.vi-hps.org/tools/)
(Virtual Institute for High Productivity Supercomputing). The following tools
are installed on CSCS systems and can assist developers of simulation codes to
address their needs in performance analysis:

* [Score-P](http://www.vi-hps.org/tools/score-p.html) 
is a highly scalable instrumentation and measurement infrastructure
for profiling, event tracing, and online analysis. It supports a wide range of
HPC platforms (CRAY, IBM, Linux) and programming models (MPI, OpenMP and
OpenACC/CUDA). Score-P provides core measurement services for a range of
specialized analysis tools, such as Vampir, Scalasca, TAU, or Periscope.

* [Scalasca](http://www.vi-hps.org/tools/scalasca.html) supports the
performance optimization of parallel programs with a collection of scalable
trace-based tools for in-depth analyses of concurrent behavior. The analysis
identifies potential performance bottlenecks - in particular those concerning
communication and synchronization - and offers guidance in exploring their
causes.

* [Vampir](http://www.vi-hps.org/tools/vampir.html) is a performance visualizer
that allows to quickly study a program's runtime behavior at a fine level of
details. This includes the display of detailed performance event recordings
over time in timelines and aggregated profiles. Interactive navigation and
zooming are the key features of the tool, which help to quickly identify
inefficient or faulty parts of a program.


## Setup

### Score-P
* Score-P supports the CCE, GNU (including Cuda), PGI (including OpenACC) and INTEL compilers.

```
module load daint-gpu # or module load daint-mc
module avail Score-P
module load Score-P
```

### Scalasca
* Scalasca supports the GNU, PGI and INTEL compilers.

```
module load daint-gpu # or module load daint-mc
module avail Scalasca 
module load Scalasca 
```

See the list of installed versions at the bottom of this page.

## Troubleshooting

For further information please check: http://www.vi-hps.org/training/material/

In case of questions/remarks, please contact us at [help@cscs.ch](mailto:help@cscs.ch)

## CSCS training material

In October 2014, CSCS organised a course focusing on "Practical Performance
Analysis of Parallel Applications". The goal of this course is to let the users
familiarise and practice the tools described above, analyse their parallel
application codes and learn performance analysis techniques that can improve
their execution performance and scalability.

The course starts with basic application instrumentation and measurement to
generate execution profiles, then improves measurement quality via
customization capabilities, and ends with interactive and automated analyses of
execution traces.

The material (presentations and hands-on practical exercises on Piz Daint Cray
XC30 system) is available on [CSCS YouTube channel](http://www.youtube.com/playlist?list=PL1tk5lGm7zvSfjUIYtfUwd0bJcKAWVIw4).
Slides are available on demand.

## Installed Versions (daint-gpu|daint-mc)
