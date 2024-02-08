using Azure.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using server.Helpers;
using server.Models;
using server.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<QuizAppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

builder.Services.AddIdentity<User, UserRole>()
    .AddEntityFrameworkStores<QuizAppDbContext>()
    .AddDefaultTokenProviders()
    .AddUserManager<UserManager<User>>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(op =>
    {
        op.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSetting:TokenKey"])),
            ValidIssuer = "http://localhost:5288/api",
            ValidAudience = "http://localhost:5288/api"
        };
    });


builder.Services.AddAuthorization(
    options =>
{
    options.AddPolicy("IsLoggedIn", policy =>
        policy.RequireClaim("IisLoggedIn", "true"));
}
);

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly); 
builder.Services.AddScoped<TokenService>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(
    options =>
{
    options.AddPolicy("WithAuthorization", builder =>
    {
        builder.AllowAnyMethod()
               .WithOrigins("http://localhost:1024")
               .AllowCredentials()
               .WithExposedHeaders("Content-Disposition")
               .WithHeaders("Authorization", "Content-Type");
    });

    options.AddPolicy("WithoutAuthorization", builder =>
    {
        builder.WithMethods("GET", "POST")
               .AllowAnyHeader()
               .WithOrigins("http://localhost:1024")
               .WithExposedHeaders("Content-Disposition");
    });
}
);

var app = builder.Build();


app.UseHttpsRedirection();
app.UseRouting();


// Enable CORS

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:1024"));
app.UseCors("WithAuthorization");
app.UseCors("WithoutAuthorization");


// Enable authentication and authorization
app.UseMiddleware<TokenValidationMiddleware>();

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();