# Apache Spark

Apache Spark™ is a fast and general engine for large-scale data processing. This
document gives a quick introduction how to get a first test program in Spark
running on Piz Daint. As an example we use Spark 1.6.0 but other versions might
be available on the system. Use `module avail` to get an overview.


# Setup and Running on Piz Daint

Note that running Apache Spark on Piz Daint is different (i) from running Spark
on a standard cluster, and (ii) from running MPI based applications on Piz
Daint. In order to use Spark, three steps have to be kept in mind when
submitting a job to the queing system:

1. an entire Spark cluster has to be started on the allocated nodes
2. when the Spark cluster is up and running, Spark jobs have to be submitted to the cluster
3. after all Spark jobs have finished running, the cluster has to be shut down

The following script exemplifies how to implement these three steps. The script
asks for 5 nodes, making 5*36 CPUs available to the Spark cluster. Since Spark
has a master slave architecture, this means we will have one master node and
four worker nodes. Further, the job is constraint to the MC nodes of Piz Daint
and its running time is 15 minutes.

Step one is to start the cluster, which is implemented by executing the
`start-all.sh` script. Step two is submitting Spark jobs to the Spark cluster,
which is implemented by running the `spark-submit` command. To shut the Spark
cluster down, the script `stop-all.sh` has to be executed.

Fine tuning of Spark's configuration can be done by setting parameters in the
environment variable `$SPARK_CONF`.

```bash
#!/bin/bash

#SBATCH --job-name="spark"
#SBATCH --time=00:15:00
#SBATCH --nodes=5
#SBATCH --constraint=mc
#SBATCH --output=sparkjob.%j.log

# set some variables for Spark
export SPARK_WORKER_CORES=36
export SPARK_LOCAL_DIRS="/tmp"

# load modules
module load slurm
module use $PWD
module load spark.module

# deploy of spark
start-all.sh

# some extra Spark configuration
SPARK_CONF="
--conf spark.default.parallelism=10
--conf spark.executor.cores=8
--conf spark.executor.memory=15g
--conf spark.rdd.compress=false
--conf spark.shuffle.compress=false
--conf spark.broadcast.compress=false
--conf spark.hadoop.dfs.replication=1
--conf spark.driver.memory=60G"

# submit a Spark job
spark-submit ${SPARK_CONF} --master $SPARKURL <my_script>

# clean out Spark deployment
stop-all.sh
```

Also note that in order to use Spark on Piz Daint you have to load the
corresponding module:

```bash
module load daint-mc
module load Spark/1.6.0-Python-3.5.2
```


# Testing Apache Spark

Apache Spark comes with a set of example programes that can be used to verify
that the system is running correctly. The following script creates a 2 node
Spark cluster (one master, one worker) and submits the Pi approximation example.

```bash
#!/bin/bash

#SBATCH --job-name="spark"
#SBATCH --time=00:15:00
#SBATCH --nodes=2
#SBATCH --constraint=mc
#SBATCH --output=sparkjob.%j.log

# set some variables for Spark
export SPARK_WORKER_CORES=36
export SPARK_LOCAL_DIRS="/tmp"

# load modules
module load slurm
module use $PWD
module load spark.module

# deploy of spark
start-all.sh

# some extra Spark configuration
SPARK_CONF=""

# submit a Spark job
spark-submit ${SPARK_CONF} --master $SPARKURL --class org.apache.spark.examples.SparkPi /.../spark/1.6.2/lib/spark-examples-1.6.2-hadoop2.6.0.jar 10000;

# clean out Spark deployment
stop-all.sh
```

The output is stored in a log file with the name `sparkjob.<jobid>.log`. By
default Spark is quite verbose, so the desired output at at the end of the file:

```bash
...
17/04/05 16:41:56 INFO TaskSchedulerImpl: Removed TaskSet 0.0, whose tasks have all completed, from pool
17/04/05 16:41:56 INFO DAGScheduler: Job 0 finished: reduce at SparkPi.scala:36, took 5.976415 s
Pi is roughly 3.14163436
17/04/05 16:41:56 INFO SparkUI: Stopped Spark web UI at http://148.187.46.54:4040
17/04/05 16:41:56 INFO SparkDeploySchedulerBackend: Shutting down all executors
...
```

# Further Documentation

[Apache Spark website](http://spark.apache.org/)

