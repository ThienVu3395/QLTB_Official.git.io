﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OAMS.Database
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class dbOAMSEntities : DbContext
    {
        public dbOAMSEntities()
            : base("name=dbOAMSEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tbChucnang> tbChucnangs { get; set; }
        public virtual DbSet<tbDanhmuc> tbDanhmucs { get; set; }
        public virtual DbSet<tbLoaiDM> tbLoaiDMs { get; set; }
        public virtual DbSet<tbModule> tbModules { get; set; }
        public virtual DbSet<tbNhomchucnang> tbNhomchucnangs { get; set; }
        public virtual DbSet<tbVitriluutru> tbVitriluutrus { get; set; }
        public virtual DbSet<tbBophan> tbBophans { get; set; }
        public virtual DbSet<tbChucvu> tbChucvus { get; set; }
        public virtual DbSet<tbCoquan> tbCoquans { get; set; }
        public virtual DbSet<tbNguoidung> tbNguoidungs { get; set; }
        public virtual DbSet<tbNhom> tbNhoms { get; set; }
        public virtual DbSet<tbNhom_Chucnang> tbNhom_Chucnang { get; set; }
        public virtual DbSet<tbNhom_Users> tbNhom_Users { get; set; }
        public virtual DbSet<tbFilecongvan> tbFilecongvans { get; set; }
        public virtual DbSet<tbFiledinhkem> tbFiledinhkems { get; set; }
        public virtual DbSet<tbFilexuly> tbFilexulies { get; set; }
        public virtual DbSet<tbFlownode> tbFlownodes { get; set; }
        public virtual DbSet<tbLinhvuc> tbLinhvucs { get; set; }
        public virtual DbSet<tbLoaivanban> tbLoaivanbans { get; set; }
        public virtual DbSet<tbSovanban> tbSovanbans { get; set; }
        public virtual DbSet<tbVanbanden> tbVanbandens { get; set; }
        public virtual DbSet<tbVBdenCanbo> tbVBdenCanboes { get; set; }
        public virtual DbSet<tbVBdenWorkflow> tbVBdenWorkflows { get; set; }
        public virtual DbSet<tbWorkflow> tbWorkflows { get; set; }
        public virtual DbSet<tbYkienxuly> tbYkienxulies { get; set; }
        public virtual DbSet<NEWS_TapTinDinhKem> NEWS_TapTinDinhKem { get; set; }
        public virtual DbSet<NEWS_TinTuc> NEWS_TinTuc { get; set; }
        public virtual DbSet<NEWS_TinTucTapTin> NEWS_TinTucTapTin { get; set; }
        public virtual DbSet<NEWS_TrangThaiChung> NEWS_TrangThaiChung { get; set; }
        public virtual DbSet<NEWS_LoaiTinTuc> NEWS_LoaiTinTuc { get; set; }
        public virtual DbSet<NEWS_NguoiSuDung> NEWS_NguoiSuDung { get; set; }
        public virtual DbSet<NEWS_BinhLuan> NEWS_BinhLuan { get; set; }
    }
}
