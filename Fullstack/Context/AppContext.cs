using Fullstack.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack.Context
{
    public class AppContext : DbContext
    {
        
            public DbSet<User> Users { get; set; }
        

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseNpgsql(
                    @"Host=localhost;Database=Fullstack;Username=postgres;Password=iksqdn94");
            }
        
    }
}
