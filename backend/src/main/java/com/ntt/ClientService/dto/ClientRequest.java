package com.ntt.ClientService.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class ClientRequest {
    @NotBlank(message = "El tipo de documento es obligatorio")
    @Pattern(regexp = "[CP]", message = "Tipo de documento no válido. Solo se acepta C (Cédula) o P (Pasaporte)")
    private String tipoDocumento;

    @NotBlank(message = "El número de documento es obligatorio")
    @Size(min = 8, max = 11, message = "El número de documento debe tener entre 8 y 11 caracteres")
    private String numeroDocumento;
}