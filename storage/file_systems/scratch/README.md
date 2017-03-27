# /scratch

The `/scratch` file system is designed for performance rather than reliability, as a fast workspace for temporary storage. All CSCS systems provide a scratch personal folder for users that can be accessed through the environment variable `$SCRATCH`.

Piz Daint shares a Lustre scratch file system mounted on `/scratch/snx3000`, while clusters share a separate GPFS scratch file system under `/scratch/shared`. Mönch has instead a dedicated internal Lustre scratch file system mounted on `/mnt/lnec`.

No strict quotas are enforced on `/scratch`, but a soft quota on the number of inodes (i.e. files and folders) is enforced on Piz Daint (`/scratch/snx3000`). In order to prevent a degradation of the performance, users with over 1 million files and folders will be warned at submit time and will not be able to submit new jobs.

Please note that a cleaning policy is in place on `/scratch`: all files older than 30 days will be deleted by a script that runs daily, so please ensure that you do not target this as a long term storage. Please note that in order to avoid performance and stability issues on the `/scratch` filesystem, if the occupancy grows above the critical limit of 60% we will be forced to ask you immediate action to remove unnecessary data.  

Keep also in mind that data on `/scratch` are not backed up, therefore users are advised to move valuable data to the `/project` filesystem as soon as batch jobs are completed. Please, do not use the `touch` command to prevent the cleaning policy from removing files, because this behaviour would deprive the community of a shared resource. 
