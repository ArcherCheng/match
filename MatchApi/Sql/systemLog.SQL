--------------------------------------------------------------------------------------------
--資料庫檔案(表格)命名方式說明 

--第1,2碼=系統類別
--aa = 基準系統--所有系統都需要
--hm = 人事系統
--ph = 勞健保系統
--lv = 請假系統
--ot = 加班系統
--tc = 刷卡系統
--rw = 報工系統

--第3碼=檔案屬性類別
--0 = 代號檔,代碼檔,cod,set,基本上系統上線時,只要第一次設定好,就很少會再變動了
--1 = 主檔,emp,mas,如員工主檔,客戶主檔,產品主檔,會隨著公司的經營,緩慢增加其內容
--2 = 平日作業資料檔,平日營運資料輸入檔,dat,rec,為公司平日營運的資料,為公司最重要的資料,每日出貨單,每日加班單等
--3 = 統計或月結資料檔(不會清掉),mon,yer,可以考量是否可以儘量用 view 來完成
--4 = 暫時檔,暫時印表統計檔(會清除掉),tmp,prt,sum,tot
--5 = 歷史檔

--第4,5,6碼=檔案內容說明 及 第7,8碼=序號
--emp10 == 員工基本資料檔
--emp11 == 員工工作經歷資料檔
--emp12 == 員工親屬資料檔

--如:人事出勤系統
--hm0dep10 部門代號檔
--hm1emp10 員工基本資料檔
--ot2ovt10 每日加班資料檔
--ot3mon10 每月加班總檔
--ot4prt10 部門加班類別統計檔
--ot5ovt10 每日加班歷史資料檔
--------------------------------------------------------------------------------------------





--------------------------------------------------------------------------------------------
--aa9log10-系統異動記錄檔
--aa = 基準系統--所有系統都需要
--------------------------------------------------------------------------------------------
--表格內容異動記錄檔
--drop table aa9log10
--網頁程式點擊進入動作記錄檔
--drop table aa9log20;
--------------------------------------------------------------------------------------------
--表格內容異動記錄檔
--drop table aa9log10  
--------------------------------------------------------------------------------------------
create table AA9log10(
   Id bigint identity(1,1) not null,
   TableName nvarchar(32) null,
   InsertData xml null,
   DeleteData xml null,
   IsType tinyint null,
   UpdateTime datetime  null,
   constraint pk_AA9log10 primary key (Id asc))
go

alter table AA9log10 add constraint df_AA9log10_updatetime default (getdate()) for updatetime
go

create index in_AA9log10_tablename on AA9log10(Tablename asc,Updatetime asc);
go


/*
--本系統的檔案表格的內容異動,都會用以下的 trigger 方式記錄 log,
--所有的人為異動,都會放入到這個檔案中aa9log10,統一管理以降低系統複雜度
create trigger tr_aa1usr10_iud on aa1usr10 with encryption after insert,update,delete not for replication as
begin
	declare @tablename nvarchar(32);
	set @tablename='aa1usr10';

	declare @istype tinyint;
	set @istype=0;
 
	if exists(select 1 from inserted) and not exists(select 1 from deleted)
		set @istype = 1;    --insert
	else if not exists(select 1 from inserted) and exists(select 1 from deleted)
		set @istype = 3;    --delete
	else if exists(select 1 from inserted) and exists(select 1 from deleted)
		begin
			set @istype = 2;    --update
			--以下情況不做log
			--使用者欲刪除資料時,程式會先更新刪除者及刪除時間位置(writetype=3)..等,這是屬於刪除的前置作業,不做log,只做刪除這個動作的log
			--月結過帳時須資料會整批先清為零(writetype=4),就不做log,逐筆計算時,再做寫入log
			declare @wrtype int;
			select @wrtype=writetype from inserted;
			if @wrtype > 2 return; 
		end
	
	--declare @insertdata xml;
	--declare @deletedata xml;
	--set @insertdata=(select * from inserted for xml auto);
	--set @deletedata=(select * from deleted for xml auto);

	declare @insertdata nvarchar(max);
	declare @deletedata nvarchar(max);
	set @insertdata=(select * from inserted for json auto);
	set @deletedata=(select * from deleted for json auto);

	insert into aa9log10(tablename,insertdata,deletedata,istype)values(@tablename,@insertdata,@deletedata,@istype);
end
go
*/




--------------------------------------------------------------------------------------------
--網頁程式點擊進入動作記錄檔
--drop table aa9log20;
--------------------------------------------------------------------------------------------
create table AA9log20(
 	Id bigint identity(0,1) not null,
	UserId nvarchar(32) not null,
	Refer nvarchar(512) null,
	Destination nvarchar(512) null,
	QueryString nvarchar(512) null,
	Method nvarchar(32) null,
	IpAddress nvarchar(32) null,
	RequestTime datetime null,
    constraint pk_AA9log20 primary key clustered (Id asc)
) 
go

alter table AA9log20 add constraint DF_AA9log20_RequestTime default (getdate()) for RequestTime
go

create index in_AA9log20_userid on AA9log20(UserId asc,RequestTime asc);
go
--create index in_aa9log20_refer on aa9log20(refer asc);
go
--create index in_aa9log20_destination on aa9log20(destination asc);
go

/*
程式部分放入如下程式即可自動記錄使用者之點擊網頁的記錄
public class actionlogattribute : system.web.mvc.actionfilterattribute
{
        public override void onresultexecuted(resultexecutedcontext filtercontext)
        {
            base.onresultexecuted(filtercontext);

            if (httpcontext.current.user.identity.isauthenticated)
            {
                using (appdbcontext db = new appdbcontext())
                {
                    aa9log20 log = new aa9log20()
                    {
                        userid = (httpcontext.current.user.identity.isauthenticated ? filtercontext.httpcontext.user.identity.name : "anonymous"),
                        refer = (filtercontext.httpcontext.request.urlreferrer == null ? filtercontext.httpcontext.request.url.absolutepath : filtercontext.httpcontext.request.urlreferrer.absolutepath),
                        //destination = filtercontext.routedata.values["controller"] + "." + filtercontext.routedata.values["action"],
                        destination = filtercontext.httpcontext.request.url.absolutepath,
                        querystring = filtercontext.httpcontext.request.querystring.tostring(),
                        method = filtercontext.httpcontext.request.httpmethod,
                        ipaddress = filtercontext.httpcontext.request.userhostaddress,
                        requesttime = system.datetime.now
                    };
                    db.aa9log20.add(log);
                    db.savechanges();
                }
            }
		}
}

既然使用了mvc，那麼就直接在app_start\filterconfig.cs中設定全站的套用，必經追蹤不是只有一兩個頁面會使用到
filters.add(new actionlogattribute());

*/
