set terminal png
set output "walltime_daint.png"
set xlabel "Compute nodes"
set ylabel "Elapsed time (seconds)" 
set xrange [0:12]
set yrange [0:270]
set xtics 0,4,32
set grid

plot \
"scaling.data" using 1:5 i 0 w lp lw 2 t "NAMD/2.11-CrayIntel-2016.11 (daint-gpu)", \
"scaling.data" using 1:5 i 1 w lp lw 2 t "NAMD/2.11-CrayIntel-2016.11 (daint-mc)"
