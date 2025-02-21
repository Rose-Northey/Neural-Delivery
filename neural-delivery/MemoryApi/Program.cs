using Microsoft.EntityFrameworkCore;
using MemoryApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:3000","http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<MemoryContext>(opt =>
    opt.UseInMemoryDatabase("MemoryList"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseRouting();  
	
app.UseCors();

app.MapControllers();

app.Run();
