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
                    @"Host=virmagic.cwypp0fp9xxt.us-east-2.rds.amazonaws.com;Database=virmagic;Username=virmagic;Password=iksqdn94");
            }
        
    }
}
