#[estimated]=00:10:05 
Feature: TEST-2208: (LOGIN) - Login con usuario y contraseña
    [description]=Es una descripcion
    [precondition]=Es una precondition
    [status]=To Do
    [priority]=High
    [assignee]=712020:de07066e-d0bd-46d7-add7-2847ec451521
    [labels]=Manual,Regression,Smoke
    [story]=TEST-2208
    [fix] = ULTRA-2024-Q2-Sprint01,SteelPulse-2024-Q2-Sprint01
    [components] = API-NE-GESTIONENDOSOS,API-NE-VIAJEHOGAR
    [sprint] = Board Pruebas DevSecOps/Board Sprint 1
    [automatizable]=No->No aplica
    
    Scenario: Happy Path - Login NO ACTIVADO
        [folder] = /FolderTest

        Given que me encuentro en la página
        When ingreso un correo válido "usuario@ejemplo.com"
        And ingreso una contraseña válida "mi_contraseña_secreta"
        And doy clic en "siguiente"
        Then se realiza el login exitosamente
        And soy redirigido a la pantalla principal de la app


    Scenario: Happy Path - Login VENCIDO
        Given que me encuentro en la página
        When ingreso un correo válido "usuario@ejemplo.com"
        And ingreso una contraseña válida "mi_contraseña_secreta"
        And doy clic en "siguiente"
        Then se realiza el login exitosamente
        And soy redirigido a la pantalla principal de la app

