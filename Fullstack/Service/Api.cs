using Fullstack.Models;
using Fullstack.Service.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack.Service
{
    public class Api :  IApi
    {
        private readonly Context.AppContext _context;

        public Api(Context.AppContext context)
        {
            _context = context;
        }

        [EnableCors]
        public async Task<IEnumerable<ManageTask>> GetTasks()
        {
            return await _context.ManageTasks.ToListAsync();
        }
        [EnableCors]
        public async Task<IEnumerable<ManageTask>> GetExpiringTasks()
        {
           
            
            return  from t in await _context.ManageTasks.ToListAsync() 
                   where DateTime.Now > t.Date_Finish.AddHours(-2) && DateTime.Now < t.Date_Finish
                   orderby t 
                   select t; 
        }

    }
}
