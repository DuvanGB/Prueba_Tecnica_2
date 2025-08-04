package com.ntt.ClientService.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ntt.ClientService.dto.ClientResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);
    private List<ClientData> clientes;
    private final ObjectMapper objectMapper;

    public ClientService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void cargarClientes() {
        try {
            ClassPathResource resource = new ClassPathResource("clients.json");
            InputStream inputStream = resource.getInputStream();

            this.clientes = objectMapper.readValue(inputStream, new TypeReference<List<ClientData>>() {});
            logger.info("Se cargaron {} clientes desde el archivo JSON", clientes.size());

        } catch (IOException e) {
            logger.error("Error al cargar el archivo clientes.json", e);
            throw new RuntimeException("No se pudo cargar el archivo de clientes", e);
        }
    }

    public Optional<ClientResponse> buscarCliente(String tipoDocumento, String numeroDocumento) {
        logger.info("Buscando cliente - TipoDoc: {}, NumDoc: {}", tipoDocumento, numeroDocumento);

        Optional<ClientData> clienteEncontrado = clientes.stream()
                .filter(cliente -> cliente.getTipoDocumento().equals(tipoDocumento) &&
                        cliente.getNumeroDocumento().equals(numeroDocumento))
                .findFirst();

        if (clienteEncontrado.isPresent()) {
            ClientData cliente = clienteEncontrado.get();
            ClientResponse response = new ClientResponse()
                    .setPrimerNombre(cliente.getPrimerNombre())
                    .setSegundoNombre(cliente.getSegundoNombre())
                    .setPrimerApellido(cliente.getPrimerApellido())
                    .setSegundoApellido(cliente.getSegundoApellido())
                    .setTelefono(cliente.getTelefono())
                    .setDireccion(cliente.getDireccion())
                    .setCiudadResidencia(cliente.getCiudadResidencia());
            logger.info("Cliente encontrado: {}", response);
            return Optional.of(response);
        }

        logger.warn("Cliente no encontrado - TipoDoc: {}, NumDoc: {}", tipoDocumento, numeroDocumento);
        return Optional.empty();
    }

    private static class ClientData {
        private String tipoDocumento;
        private String numeroDocumento;
        private String primerNombre;
        private String segundoNombre;
        private String primerApellido;
        private String segundoApellido;
        private String telefono;
        private String direccion;
        private String ciudadResidencia;

        // Getters y Setters
        public String getTipoDocumento() { return tipoDocumento; }
        public void setTipoDocumento(String tipoDocumento) { this.tipoDocumento = tipoDocumento; }

        public String getNumeroDocumento() { return numeroDocumento; }
        public void setNumeroDocumento(String numeroDocumento) { this.numeroDocumento = numeroDocumento; }

        public String getPrimerNombre() { return primerNombre; }
        public void setPrimerNombre(String primerNombre) { this.primerNombre = primerNombre; }

        public String getSegundoNombre() { return segundoNombre; }
        public void setSegundoNombre(String segundoNombre) { this.segundoNombre = segundoNombre; }

        public String getPrimerApellido() { return primerApellido; }
        public void setPrimerApellido(String primerApellido) { this.primerApellido = primerApellido; }

        public String getSegundoApellido() { return segundoApellido; }
        public void setSegundoApellido(String segundoApellido) { this.segundoApellido = segundoApellido; }

        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }

        public String getDireccion() { return direccion; }
        public void setDireccion(String direccion) { this.direccion = direccion; }

        public String getCiudadResidencia() { return ciudadResidencia; }
        public void setCiudadResidencia(String ciudadResidencia) { this.ciudadResidencia = ciudadResidencia; }
    }
}