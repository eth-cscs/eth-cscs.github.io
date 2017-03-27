# Compute Budget

Compute time on Cray systems will be accounted in node hours; computing time on CSCS systems for data pre- and post-processing needs to be requested separately, and it will be accounted in core hours, on the machines that allow node sharing.

Note that resources at CSCS are assigned over three-month windows. Quotas are reset on April 1st, July 1st, October 1st and January 1st, therefore please make sure to use thoroughly your quarterly compute budget within the corresponding time frame. Resources unused in the 3-monthly periods are not transferred to the next allocation period but are forever lost.

Two different scripts let you check your compute budget on the systems in the current allocation window. Please login in on the system you are interested in and run one of the following commands:

## Group usage - `sbucheck`

`sbucheck` reports group usage breakdowns across the various systems, e.g.:
```
Per-project usage at CSCS since Sun 1 January, 12am CET
Allocation period ending Fri 31 March, 11pm CEST

sXXX:   Authorized Daint constraints: gpu
           DAINT Usage:   yyy NODE HOURS (NH)   Quota:    zzz NH    0.0%
```

## Monthly usage - `monthly_usage`

`monthly_usage` reports the group usage on the current system, e.g.:
```
FROM:  Tue 1 Apr 2014
TO:    Fri 25 Apr 2014 

Usage in Node hours for the Crays OR Cpu hours for all other clusters for 'sXXX'
'DAINT'

Month          Day        Usage          Total         %Usage

=======  =====  =======  =======  =========

[... list of the usage per day...]
```

It also accepts command line options, e.g.

`monthly_usage -h` lists all the options you can use with this script

`monthly_usage --individual` reports the usage per member of the project
