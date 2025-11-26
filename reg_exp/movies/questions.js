1.How many films has Shah Rukh Khan acted in?
  grep - c "Actor" finalSrk.csv 
 
2.The year where SRK acted in the most number of movies and the number of movies he acted in that year.
  cut - d"," - f2 finalSrk.csv | uniq - c | sort - rn 
  
3.