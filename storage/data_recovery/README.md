# Data Recovery

GPFS Snapshots provide an online backup that allows easy recovery from common problems such as accidental deletion of a file or the need to compare older versions of the same file. Snapshots of the entire GPFS file systems (/project, /users) are taken every day for the last seven days, while older snapshots are deleted automatically. Snapshots of a file system are read-only; changes can only be made to the active non-snapshots files and directories. 

## How to restore a file from GPFS snapshots

GPFS snapshot creates a `.snapshots` subdirectory within every folder in the GPFS file system: that hidden folder holds several subdirectories with a daily backup for each one of the last seven days, starting from the current one. The name of these subdirectories follow the format `snap-YYYYMMDD`.

Snapshots directories are not visible to the `ls` command or `readdir()` function: this is meant to prevent recursive file system utilities - such as `find` or `tar` - from entering into the snapshot tree for each directory they process.

For example, the command `ls -a /project/<group_id>` does not list the hidden read-only folder `.snapshots`, but both `ls /project/<group_id>/.snapshots` and `cd /project/<group_id>/.snapshots` do.

```bash
$ ls /project/<group_id>/.snapshots

snap-20150610  snap-20150611  snap-20150612  snap-20150613  snap-20150614  snap-20150615  snap-20150616
```

Recovering a file or a directory from GPFS snapshots is straightforward. For instance, type `cd /project/<group_id>/.snapshots` and choose the most convenient snapshot among the available dates, then copy the old file to the original directory. 
Example:

The file `/project/mygroup/myfolder/myfile has been deleted or modified by mistake and you want to retrieve the version of the day before.

```bash
$ cd /project/mygroup/myfolder/.snapshots
$ ls

snap-20150610  snap-20150611  snap-20150612  snap-20150613  snap-20150614  snap-20150615  snap-20150616
$ cd snap-20150615
$ ls
myfile
$ cp myfile /project/mygroup/myfolder
```
