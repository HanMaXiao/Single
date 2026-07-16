import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectDetailLink } from '@/pages/ProjectDetail';
import { ChevronDown, MoreVertical, Plus, Search } from 'lucide-react';

const projects = [
  {
    name: '四川峨眉山景区',
    id: '538',
    status: '正常',
    scene: 'AI讲解导览',
    operator: '上海虹途奇点文化科技有限公司',
    deviceOwner: '上海虹途奇点文化科技有限公司',
    signer: '灵伴科技（武汉）有限公司',
    projectNo: '816280443963019267',
    usage: '运营',
    type: '景区',
  },
];

export function AttractionsPage() {
  return (
    <div className="space-y-3">
      <div className="text-sm font-black text-nature-moss">全部项目</div>
      <Card className="min-h-[calc(100vh-104px)] border-white/80 bg-white/95">
        <CardHeader>
          <CardTitle className="text-xl font-black text-nature-moss">项目列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 border-b border-stone-200 pb-5">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-300" />
              <input
                className="h-9 w-full rounded-md border border-stone-200 bg-white pl-9 pr-3 text-sm outline-none transition duration-200 placeholder:text-stone-300 focus:border-nature-leaf focus:ring-2 focus:ring-nature-leaf/20"
                placeholder="请输入项目名称或项目编号"
              />
            </div>
            <select className="h-9 w-full max-w-xs rounded-md border border-stone-200 bg-white px-3 text-sm text-muted-foreground outline-none focus:border-nature-leaf">
              <option>请选择运营方</option>
            </select>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 border-l border-stone-200 pl-4 text-sm font-black text-nature-moss"
            >
              <ChevronDown className="h-4 w-4" />
              展开更多筛选
            </button>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="h-9 rounded-md bg-nature-moss px-5 text-sm font-black text-white transition duration-200 hover:brightness-110 active:translate-y-px"
              >
                查询
              </button>
              <button
                type="button"
                className="h-9 rounded-md border border-stone-200 bg-white px-5 text-sm font-bold text-nature-moss transition duration-200 hover:bg-lime-50"
              >
                重置
              </button>
            </div>
          </div>

          <div className="py-5">
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-md bg-nature-moss px-4 text-sm font-black text-white transition duration-200 hover:brightness-110 active:translate-y-px"
            >
              <Plus className="h-4 w-4 text-nature-leaf" />
              新建项目
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-stone-200">
            <table className="min-w-[1480px] w-full border-collapse text-left text-sm">
              <thead className="bg-stone-50 text-nature-moss">
                <tr>
                  {[
                    '项目名称',
                    '项目ID',
                    '项目状态',
                    '项目场景',
                    '运营方',
                    '设备方',
                    'rokid签约方',
                    '项目编号',
                    '资产用途',
                    '业务类型',
                    '操作',
                  ].map((head) => (
                    <th key={head} className="border-b border-stone-100 px-4 py-4 font-black">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="transition duration-200 hover:bg-lime-50/50">
                    <td className="px-4 py-6 font-black text-nature-moss">{project.name}</td>
                    <td className="px-4 py-6 text-nature-moss">{project.id}</td>
                    <td className="px-4 py-6">
                      <span className="rounded-md border border-lime-200 bg-lime-50 px-2 py-0.5 text-xs font-black text-lime-600">
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-6">{project.scene}</td>
                    <td className="px-4 py-6 font-semibold">{project.operator}</td>
                    <td className="px-4 py-6 font-semibold">{project.deviceOwner}</td>
                    <td className="px-4 py-6 font-semibold">{project.signer}</td>
                    <td className="px-4 py-6">{project.projectNo}</td>
                    <td className="px-4 py-6">{project.usage}</td>
                    <td className="px-4 py-6">{project.type}</td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2">
                        <ProjectDetailLink />
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 bg-white text-muted-foreground transition duration-200 hover:bg-lime-50 hover:text-nature-moss"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-end gap-4 text-sm text-muted-foreground">
            <span>共1条</span>
            <span className="text-stone-300">‹</span>
            <span className="rounded-md border border-stone-300 px-3 py-1 font-black text-nature-moss">
              1
            </span>
            <span className="text-stone-300">›</span>
            <select className="h-9 rounded-md border border-stone-200 bg-white px-3 text-sm text-nature-moss">
              <option>20 条/页</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
