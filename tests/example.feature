#[estimated]=00:10:05 
Feature: TEST-2208: (LOGIN) - Login con usuario y contraseña
    [description]=Es una descripcion
    [precondition]=Lorem ipsum precondition
    [status]=To Do
    [priority]=High
    [assignee]=818189:ed07188a-d0dd-46d9-adb7-2549rs452327
    [labels]=Manual,Regression,Smoke
    [story]=TEST-2208
    [fix]=SQT-Sprint01,SQR-Sprint01
    [components]=API-TEST1,API-TEST2
    [sprint]=Board Pruebas/Board Sprint 1
    
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

