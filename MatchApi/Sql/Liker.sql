--------------------------------------------------------------------------------------------
--會員投票檔
--------------------------------------------------------------------------------------------
--drop table Liker
go
create table Liker
(
	PartyId       int               not null,
	UserId        int               not null,
	LikerId       int               not null,
	AddedDate     datetime          not null,

	--以下每檔資料表都會有這些欄位
	WriteType     integer        null,
	WriteTime     datetime       null,
	WriteUser     nvarchar(32)   null,
	WriteIp       nvarchar(32)   null,
	constraint Pk_liker primary key (PartyId,UserId,LikerId) 
);
go


-- alter table Liker drop constraint Liker_PartyId
go
alter table Liker add constraint Liker_Party
      foreign key (PartyId)
      references Party(PartyId)
	  ON UPDATE CASCADE
	  ON DELETE NO ACTION
go

-- alter table Liker drop constraint Liker_MyLiker
go
alter table Liker add constraint Liker_MyLiker
      foreign key (LikerId)
      references Member(UserId)
	  ON UPDATE NO ACTION
	  ON DELETE NO ACTION
go

-- alter table Liker drop constraint liker_LikerMe
go
alter table Liker add constraint Liker_LikerMe
      foreign key (UserId)
      references Member(UserId)
	  ON UPDATE NO ACTION
	  ON DELETE NO ACTION
go


create trigger tr_Liker_iud on Liker after insert,update,delete not for replication as
begin
	declare @tablename nvarchar(32);
	set @tablename='Liker';

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
	
	declare @insertdata nvarchar(max);
	declare @deletedata nvarchar(max);

	set @insertdata=(select * from inserted for json auto);
	set @deletedata=(select * from deleted for json auto);

	insert into aa9log10(tablename,insertdata,deletedata,istype)values(@tablename,@insertdata,@deletedata,@istype);
end
go