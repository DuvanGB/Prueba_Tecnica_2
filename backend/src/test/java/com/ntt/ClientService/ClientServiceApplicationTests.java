package com.ntt.ClientService;

import com.ntt.ClientService.dto.ClientRequest;
import com.ntt.ClientService.dto.ClientResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ClientServiceApplicationTests {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void consultarCliente_Success() throws Exception {
		String requestJson = """
        {
            "tipoDocumento": "C",
            "numeroDocumento": "23445322"
        }
        """;

		mockMvc.perform(MockMvcRequestBuilders.post("/api/clientes/consultar")
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestJson))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.primerNombre").value("Duvan"))
				.andExpect(jsonPath("$.segundoNombre").value("Andres"))
				.andExpect(jsonPath("$.primerApellido").value("Galvis"))
				.andExpect(jsonPath("$.segundoApellido").value("Brito"));
	}

	@Test
	public void consultarCliente_InvalidDocumentType() throws Exception {
		String requestJson = """
        {
            "tipoDocumento": "X",
            "numeroDocumento": "23445322"
        }
        """;

		mockMvc.perform(MockMvcRequestBuilders.post("/api/clientes/consultar")
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestJson))
				.andExpect(status().isBadRequest());
	}

	@Test
	public void consultarCliente_MissingDocumentNumber() throws Exception {
		String requestJson = """
        {
            "tipoDocumento": "C",
            "numeroDocumento": ""
        }
        """;

		mockMvc.perform(MockMvcRequestBuilders.post("/api/clientes/consultar")
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestJson))
				.andExpect(status().isBadRequest());
	}

	@Test
	public void consultarCliente_NotFound() throws Exception {
		String requestJson = """
        {
            "tipoDocumento": "C",
            "numeroDocumento": "11111111"
        }
        """;

		mockMvc.perform(MockMvcRequestBuilders.post("/api/clientes/consultar")
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestJson))
				.andExpect(status().isNotFound());
	}
}
