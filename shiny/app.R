library(shiny)
library(DT)

ui <- fluidPage(
  titlePanel("Synthetic Health DB"),
  sidebarLayout(
    sidebarPanel(
      selectInput("schema", "Schema:",
                  choices = c("cie10", "demographics", "comorbid")),
      numericInput("n_rows", "Filas:", 100000, min = 1000, max = 1000000),
      actionButton("generate", "Generar", class = "btn-primary"),
      downloadButton("download", "Descargar CSV")
    ),
    mainPanel(
      DT::dataTableOutput("preview")
    )
  )
)

server <- function(input, output, session) {
  rv <- reactiveValues(data = NULL)
  
  observeEvent(input$generate, {
    if (input$schema == "cie10") {
      source("R_scripts/generators/cie10.R")
      rv$data <- generate_cie10_base(input$n_rows)
    } else if (input$schema == "comorbid") {
      source("R_scripts/generators/comorbid.R")
      rv$data <- generate_comorbid_base(input$n_rows)
    }
  })
  
  output$preview <- renderDT({
    if (!is.null(rv$data)) {
      datatable(rv$data, options = list(pageLength = 10))
    }
  })
  
  output$download <- downloadHandler(
    filename = function() {
      paste0(input$schema, "_", input$n_rows, ".csv")
    },
    content = function(file) {
      if (!is.null(rv$data)) {
        fwrite(rv$data, file)
      }
    }
  )
}

shinyApp(ui, server)
