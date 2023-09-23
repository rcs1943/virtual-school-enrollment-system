<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <script>
            const doSomething = async (body) => {
                const res = await fetch("http://localhost:8080/api_rest_sistema_matricula/api/student/login", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                const resJson = await res.json();
                console.log(resJson);
            }
            doSomething({ dni: "70290308", password: "sajdshdsha" });
            
        </script>
    </body>
</html>
