set terminal png
set output "speedup_daintgpu.png"
set xlabel "Compute nodes (12c/cn + 1P100/cn)"
set ylabel "Speedup (daint-gpu)" 
set xrange [0:12]
set yrange [0:12]
set xtics 0,4,32
set grid
# set key center top
# set size 0.85,0.85

plot "scaling.data" \
using 1:2 i 0 w lp lw 2 t "NAMD/2.11-CrayIntel-2016.11-cuda-8.0.054", \
"scaling.data" using 1:3 i 0 w lp t "Ideal Speedup" 
