package com.ntt.ClientService.controller;

import com.ntt.ClientService.dto.ClientRequest;
import com.ntt.ClientService.dto.ClientResponse;
import com.ntt.ClientService.dto.ErrorResponse;
import com.ntt.ClientService.exception.ClientNotFoundException;
import com.ntt.ClientService.exception.InvalidRequestException;
import com.ntt.ClientService.service.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClientController {

    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Bienvenido al Servicio de Clientes. Use /api/clientes/consultar para consultar clientes");
    }

    @RequestMapping("/**")
    public ResponseEntity<ErrorResponse> handleNotFound() {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), "Endpoint no encontrado");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @PostMapping("/consultar")
    public ResponseEntity<ClientResponse> consultarCliente(@Valid @RequestBody ClientRequest request) {
        logger.info("Solicitud recibida - TipoDoc: {}, NumDoc: {}", request.getTipoDocumento(), request.getNumeroDocumento());

        // Validación tipo documento (Código 400 si no es válido)
        if (!"C".equals(request.getTipoDocumento()) && !"P".equals(request.getTipoDocumento())) {
            logger.error("Tipo documento no válido: {}", request.getTipoDocumento());
            throw new InvalidRequestException("Tipo de documento no válido");
        }

        // Validación número documento (Código 400 si está vacío)
        if (request.getNumeroDocumento() == null || request.getNumeroDocumento().trim().isEmpty()) {
            logger.error("Número documento vacío");
            throw new InvalidRequestException("El número de documento es obligatorio");
        }

        Optional<ClientResponse> clienteEncontrado = clientService.buscarCliente(
                request.getTipoDocumento(),
                request.getNumeroDocumento()
        );

        if (clienteEncontrado.isPresent()) {
            logger.info("Cliente encontrado: {}", clienteEncontrado.get());
            return ResponseEntity.ok(clienteEncontrado.get()); // Código 200
        }

        logger.warn("Cliente no encontrado - TipoDoc: {}, NumDoc: {}", request.getTipoDocumento(), request.getNumeroDocumento());
        throw new ClientNotFoundException("Cliente no encontrado"); // Código 404
    }
}