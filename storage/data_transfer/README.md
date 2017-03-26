# Data Transfer

CSCS provides a data transfer service to get your files from/to CSCS file systems ([External Transfer](external_transfer)) and a SLURM queue __xfer__ available on Piz Daint to transfer files from/to internal CSCS file systems ([Internal Transfer](internal_transfer)).

The service is implemented using GridFTP with SSH authentication: please look for GridFTP under the documentation of the [Globus toolkit](http://toolkit.globus.org/toolkit/docs). All CSCS users are eligible to use GridFTP to transfer files, using the GridFTP endpoint  `sshftp://gridftp.cscs.ch`.

The SLURM queue __xfer__ can submit jobs directly on the nodes of the cluster supporting data transfer. Direct access via ssh to the nodes of this cluster is not allowed.
