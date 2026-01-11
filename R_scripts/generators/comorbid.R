# Índices de comorbilidad Charlson/Elixhauser
# Migrado de PROY_BBDD_SINTETICAS

charlson_codes <- list(
  mi = c("I21.0", "I21.1", "I21.2", "I21.9", "I25.2"),
  chf = c("I50.0", "I50.1", "I50.9", "I11.0", "I13.0"),
  pvd = c("I70.0", "I70.1", "I70.2", "I71.0", "I71.1", "I73.9"),
  cevd = c("G45.0", "G45.9", "I60.0", "I61.0", "I63.0"),
  dementia = c("F00.0", "F01.0", "F03", "G30.0", "G30.1"),
  copd = c("J40", "J42", "J43.0", "J44.0", "J44.9"),
  diab_nc = c("E10.0", "E10.1", "E10.9", "E11.0", "E11.9"),
  diab_c = c("E10.2", "E10.3", "E10.4", "E11.2", "E11.3"),
  renal = c("N18.1", "N18.2", "N18.3", "N18.4", "N18.5", "N19"),
  cancer = c("C18.0", "C34.0", "C50.0", "C61", "C67.0", "C73"),
  aids = c("B20", "B21", "B22", "B23", "B24")
)

generate_comorbid_base <- function(n_patients, seed = 42) {
  set.seed(seed)
  
  all_codes <- unlist(charlson_codes)
  do.call(rbind, lapply(1:n_patients, function(i) {
    n_codes <- sample(2:6, 1)
    codes <- sample(all_codes, n_codes, replace = TRUE)
    data.table(id = i, diag = unique(codes))
  }))
}
