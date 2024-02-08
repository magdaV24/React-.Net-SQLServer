using AutoMapper;
using server.DTOs;
using server.Models;

namespace server.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CardDTO, Card>();
        }
    }
}