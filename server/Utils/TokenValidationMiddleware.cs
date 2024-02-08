using System.Security.Claims;
using server.Utils;

public class TokenValidationMiddleware
{
    private readonly RequestDelegate _next;

    public TokenValidationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        using (var scope = context.RequestServices.CreateScope())
        {
            var tokenService = scope.ServiceProvider.GetRequiredService<TokenService>();

            var authenticationHeader = context.Request.Headers["Authorization"].FirstOrDefault();

            if (authenticationHeader != null && authenticationHeader.StartsWith("Bearer "))
            {
                var token = authenticationHeader.Substring("Bearer ".Length).Trim();

                try
                {
                    var user = tokenService.ValidateToken(token);
                    if (user == null)
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return;
                    }

                    var claims = new Claim[]
                    {
                        new Claim("isLoggedIn", "true")
                    };
                    var identity = new ClaimsIdentity(claims, "Bearer");
                    context.User.AddIdentity(identity);

                    await _next(context);
                    return;
                }
                catch (Exception ex)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync(ex.Message);
                    return;
                }
            }
        }

        await _next(context);
    }
}
