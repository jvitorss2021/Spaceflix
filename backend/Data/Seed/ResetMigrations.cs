using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

public static class ResetMigrations
{
    public static void Reset(DbContext context)
    {
        try
        {
            context.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS \"__EFMigrationsHistory\"");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao tentar remover tabela: {ex.Message}");
        }
        
        Console.WriteLine("Tabela de migrações removida (ou não existia).");
    }
}