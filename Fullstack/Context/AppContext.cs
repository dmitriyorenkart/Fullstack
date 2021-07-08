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
        
            public DbSet<ManageTask> ManageTasks { get; set; }
        

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseNpgsql(
                          @"Host=localhost;Database=Fullstack;Username=postgres;Password=iksqdn94"
                    
);
            //@"Host=virmagic.cwypp0fp9xxt.us-east-2.rds.amazonaws.com;Database=virmagic;Username=virmagic;Password=iksqdn94"
        }

    }
}
