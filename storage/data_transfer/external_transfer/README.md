# External Transfer

The GridFTP data transfer can be started with the GridFTP command `globus-url-copy` on the front-end system Ela (`ela.cscs.ch`). Therefore to transfer a file from CSCS to a remote site, you need first to log in to Ela and then run the following command:
```
$ globus-url-copy \
   sshftp://<cscs_username>@gridftp.cscs.ch/<path>/<filename> \ 
   sshftp://<remote_username>@<remote_server>/<remote_path>/<remote_filename>
```

Please change the variables in between angle brackets (<...>) according to your needs.
There are several options to optimize the transfer speed, for instance the number of parallel streams: you can type the command man globus-url-copy for the full list of options.
Please try first with the default, since in most cases you'll not need to change them. Below you can find an example of a transfer which opens four parallel streams.
```
$ globus-url-copy -p 4 \
   sshftp://<cscs_username>@gridftp.cscs.ch/<path>/<filename> \
   sshftp://<remote_username>@<remote_server>/<remote_path>/<remote_filename>
```

The GridFTP server at CSCS has access to the following filesystems:
 * /scratch/snx2000
 * /scratch/snx3000
 * /project
 * /store
 * /scratch/shared

Therefore the `<path>` variable of the examples above can access any of them, even if the command is executed on Ela. 
In case the remote site doesn’t provide a GridFTP server with SSH authentication you can pull data from CSCS provided that the remote site provides a node where: 
  * you can login
  * the destination file system is mounted
  * you can use the command `globus-url-copy`

From that node you have to run a command like the following:
```
$ globus-url-copy \ 
   sshftp://<cscs_username>@gridftp.cscs.ch/<path>/<filename> \ 
   file:///<remote_path>/<remote_filename>
```

## GridFTP client setup and authentication

Any user can install GridFTP on a local workstation following the instructions available on the Globus web site. The GridFTP client is available on the CSCS front-end system Ela (`ela.cscs.ch`) and it is accessible only via SSH keys.
Therefore you need first to create the SSH keys on Ela (we recommend to set a non empty passphrase) and then place the public key within the authorized_keys file in the CSCS home directory ($HOME), as follows:
```
$ pwd
 /users/<username>
 $ ssh-keygen
 …
 $ cat .ssh/id_rsa.pub >> .ssh/authorized_keys 
```

Then you should be able to log in to Ela with the SSH key just created and to use `gridftp.cscs.ch` for your data transfer.
For a file transfer between CSCS (using `gridftp.cscs.ch`) and a remote site, also the remote endpoint has to support GridFTP with SSH authentication.
