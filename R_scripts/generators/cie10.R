# Generadores CIE-10 para testing (compatibilidad ciecl)
# Migrado de PROY_BBDD_SINTETICAS

library(data.table)

cie10_validos <- c(
  "A00.0", "A01.0", "A02.0", "A09.0", "A15.0", "A16.0", "A41.9", "B15.0",
  "C18.9", "C34.9", "C50.9", "C61", "C67.9", "C73", "C91.0",
  "D64.9", "D69.6",
  "E10.9", "E11.0", "E11.9", "E13.9", "E14.9", "E66.9", "E78.0",
  "F10.2", "F20.0", "F32.9", "F33.0",
  "G20", "G30.9", "G35", "G40.9", "G43.9",
  "I10", "I11.9", "I20.0", "I21.0", "I21.9", "I25.1", "I25.9", "I48.9", "I50.9",
  "J44.1", "J44.9", "J45.9", "J96.0",
  "K25.9", "K35.8", "K50.9", "K51.9", "K74.6",
  "M54.5", "M81.0",
  "N18.9", "N20.0",
  "R10.4", "R50.9", "R51"
)

generate_cie10_base <- function(n, seed = 42) {
  set.seed(seed)
  data.table(
    id = 1:n,
    codigo = sample(cie10_validos, n, replace = TRUE)
  )
}
