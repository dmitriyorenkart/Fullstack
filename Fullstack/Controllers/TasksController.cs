using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fullstack.Context;
using Fullstack.Models;
using Fullstack.Service.Interface;
using Fullstack.Service;

namespace Fullstack.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {

        IApi _Api;
        public TasksController(IApi Api)
        {
            _Api = Api;

        }

        
        [HttpGet]


        public async Task<JsonResult> GetTasks()
        {
            return new JsonResult(await _Api.GetTasks());
        }
        [HttpPost("GetExpiringTasks")]
        public async Task<JsonResult> GetExpiringTasks()
        {
            return new JsonResult(await _Api.GetExpiringTasks());
        }



    }
}
